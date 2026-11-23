#!/usr/bin/env python3
"""
Pixel-Art Sticker Normalization Pipeline — Reusable Utility (Phase 2.5C)

Automates the audit, alpha bounding-box cropping, optical sizing, standardization,
and CSS rendering analysis of pixel-art sticker PNGs for Muhammad Hadid Wiransetyo's CV & Tech Stack.

Target Standard:
- Canvas: 1024x1024 RGBA transparent square canvas.
- Dominant Dimension: 920px (~89.84% of canvas, matching baseline frontend standard 710/790 = 89.87%).
- Centering: Exact symmetrical transparent padding on the dominant axis (52px on each side).
- Alpha Threshold: Alpha > 10 (eliminates faint transparent artifacts while preserving
  die-cut white outlines, anti-aliased curves, and shadows).
- Resampling: High-quality Lanczos resampling (lossless passthrough if already normalized).
- Non-Destructive: Generates candidates in a staging directory by default.
  Original sources are NEVER modified or deleted.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import shutil
import sys
from dataclasses import asdict, dataclass, field
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

try:
    from PIL import Image
except ImportError:
    print("Error: Pillow is required. Please install via 'pip install Pillow'.", file=sys.stderr)
    sys.exit(1)

# Default paths
PROJECT_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_STICKER_DIR = PROJECT_ROOT / "public" / "images" / "pixel-art-sticker"
DEFAULT_OUTPUT_DIR = PROJECT_ROOT / "tmp" / "pixel-sticker-normalization"
CANDIDATES_DIR_NAME = "candidates"

# Categorization of known assets
ACTIVE_TECH_STICKERS = {
    # 01 Frontend
    "typescript-icon-sticker.png": {"category": "frontend", "tech_id": "typescript", "name": "TypeScript"},
    "javascript-icon-sticker.png": {"category": "frontend", "tech_id": "javascript", "name": "JavaScript"},
    "react-icon-sticker.png": {"category": "frontend", "tech_id": "react", "name": "React"},
    "nextjs-icon-sticker.png": {"category": "frontend", "tech_id": "nextjs", "name": "Next.js"},
    "html-icon-sticker.png": {"category": "frontend", "tech_id": "html5", "name": "HTML5"},
    "css-icon-sticker.png": {"category": "frontend", "tech_id": "css3", "name": "CSS3"},
    # 02 UI & Styling
    "ant-design-icon-sticker.png": {"category": "ui-styling", "tech_id": "ant-design", "name": "Ant Design"},
    "base-ui-icon-sticker.png": {"category": "ui-styling", "tech_id": "base-ui", "name": "Base UI"},
    "ng-zorro-icon-sticker.png": {"category": "ui-styling", "tech_id": "ng-zorro", "name": "NG-ZORRO"},
    "radix-ui-icon-sticker.png": {"category": "ui-styling", "tech_id": "radix", "name": "Radix UI"},
    "shadcn-icon-sticker.png": {"category": "ui-styling", "tech_id": "shadcn", "name": "shadcn/ui"},
    "tailwind-css-icon-sticker.png": {"category": "ui-styling", "tech_id": "tailwind", "name": "Tailwind CSS"},
    # 03 State & Data
    "tanstack-query-icon-sticker.png": {"category": "state-data", "tech_id": "tanstack-query", "name": "TanStack Query"},
    "zustand-icon-sticker.png": {"category": "state-data", "tech_id": "zustand", "name": "Zustand"},
    "redux-icon-sticker.png": {"category": "state-data", "tech_id": "redux", "name": "Redux"},
    "react-hook-form-icon-sticker.png": {"category": "state-data", "tech_id": "react-hook-form", "name": "React Hook Form"},
    "tanstack-table-icon-sticker.png": {"category": "state-data", "tech_id": "tanstack-table", "name": "TanStack Table"},
    "recharts-icon-sticker.png": {"category": "state-data", "tech_id": "recharts", "name": "Recharts"},
    # 04 Testing & Security
    "vitest-icon-sticker.png": {"category": "testing-security", "tech_id": "vitest", "name": "Vitest"},
    "jest-icon-sticker.png": {"category": "testing-security", "tech_id": "jest", "name": "Jest"},
    "testing-library-icon-sticker.png": {"category": "testing-security", "tech_id": "rtl", "name": "Testing Library"},
    "cypress-icon-sticker.png": {"category": "testing-security", "tech_id": "cypress", "name": "Cypress"},
    "jwt-icon-sticker.png": {"category": "testing-security", "tech_id": "jwt", "name": "JSON Web Token"},
    "zod-icon-sticker.png": {"category": "testing-security", "tech_id": "zod", "name": "Zod"},
    # 05 Cross-Framework
    "vuejs-icon-sticker.png": {"category": "cross-framework", "tech_id": "vue", "name": "Vue.js"},
    "nuxt-icon-sticker.png": {"category": "cross-framework", "tech_id": "nuxt", "name": "Nuxt"},
    "angular-icon-sticker.png": {"category": "cross-framework", "tech_id": "angular", "name": "Angular"},
    "blazor-server-icon-sticker.png": {"category": "cross-framework", "tech_id": "blazor", "name": "Blazor Server"},
    "nodejs-icon-sticker.png": {"category": "cross-framework", "tech_id": "nodejs", "name": "Node.js"},
    "rxjs-icon-sticker.png": {"category": "cross-framework", "tech_id": "rxjs", "name": "RxJS"},
    # 06 Dev Tools & Cloud
    "git-icon-sticker.png": {"category": "dev-tools-cloud", "tech_id": "git", "name": "Git"},
    "vite-icon-sticker.png": {"category": "dev-tools-cloud", "tech_id": "vite", "name": "Vite"},
    "postman-icon-sticker.png": {"category": "dev-tools-cloud", "tech_id": "postman", "name": "Postman"},
    "aws-icon-sticker.png": {"category": "dev-tools-cloud", "tech_id": "aws", "name": "AWS"},
    "vs-code-icon-sticker.png": {"category": "dev-tools-cloud", "tech_id": "vs-code", "name": "VS Code"},
    "gitlab-icon-sticker.png": {"category": "dev-tools-cloud", "tech_id": "gitlab", "name": "GitLab"},
}

RESERVED_TECH_STICKERS = {
    "antigravity-ide-icon-sticker.png": {"category": "dev-tools-cloud", "tech_id": "antigravity-ide", "name": "Antigravity IDE"},
    "auth0-icon-sticker.png": {"category": "testing-security", "tech_id": "auth0", "name": "Auth0"},
    "dotnet-icon-sticker.png": {"category": "cross-framework", "tech_id": "dotnet", "name": ".NET Framework"},
    "github-actions-icon-sticker.png": {"category": "dev-tools-cloud", "tech_id": "github-actions", "name": "GitHub Actions"},
    "ngrx-icon-sticker.png": {"category": "state-data", "tech_id": "ngrx", "name": "NgRx"},
}

SOCIAL_STICKERS = {
    "cv-resume-icon-sticker.png": {"name": "CV / Resume", "page": "contact"},
    "email-icon-sticker.png": {"name": "Email", "page": "contact"},
    "github-icon-sticker.png": {"name": "GitHub Profile", "page": "contact"},
    "instagram-icon-sticker.png": {"name": "Instagram", "page": "contact"},
    "linkedin-icon-sticker.png": {"name": "LinkedIn", "page": "contact"},
    "open-to-work-icon-sticker.png": {"name": "Open to Work", "page": "contact"},
    "strava-icon-sticker.png": {"name": "Strava", "page": "contact"},
    "threads-icon-sticker.png": {"name": "Threads", "page": "contact"},
    "www-icon-sticker.png": {"name": "Portfolio Web", "page": "contact"},
    "youtube-icon-sticker.png": {"name": "YouTube", "page": "contact"},
}

AVATAR_STICKERS = {
    "avatar-icon-sticker.png": {"name": "Avatar Profile", "page": "contact", "profile": "avatar"},
    "pixel-art-business-avatar-sticker.png": {"name": "Business Avatar", "page": "dashboard", "profile": "avatar"},
}

EXTERNAL_REFERENCES: Dict[str, List[str]] = {
    "typescript-icon-sticker.png": ["components/contact/sticker-vectors.tsx", "components/playful-footer.tsx", "lib/cv-data.ts", "components/stack/frontend-folder-prototype.tsx"],
    "javascript-icon-sticker.png": ["lib/cv-data.ts", "components/stack/frontend-folder-prototype.tsx"],
    "react-icon-sticker.png": ["components/contact/sticker-vectors.tsx", "components/playful-footer.tsx", "lib/cv-data.ts", "components/stack/frontend-folder-prototype.tsx"],
    "nextjs-icon-sticker.png": ["components/contact/sticker-vectors.tsx", "components/playful-footer.tsx", "lib/cv-data.ts", "components/stack/frontend-folder-prototype.tsx"],
    "html-icon-sticker.png": ["lib/cv-data.ts", "components/stack/frontend-folder-prototype.tsx"],
    "css-icon-sticker.png": ["lib/cv-data.ts", "components/stack/frontend-folder-prototype.tsx"],
    "tailwind-css-icon-sticker.png": ["components/contact/sticker-vectors.tsx", "components/playful-footer.tsx", "lib/cv-data.ts"],
    "vuejs-icon-sticker.png": ["components/playful-footer.tsx", "lib/cv-data.ts"],
    "nuxt-icon-sticker.png": ["components/playful-footer.tsx", "lib/cv-data.ts"],
    "angular-icon-sticker.png": ["components/playful-footer.tsx", "lib/cv-data.ts"],
    "git-icon-sticker.png": ["lib/cv-data.ts"],
    "vite-icon-sticker.png": ["components/playful-footer.tsx", "lib/cv-data.ts"],
    "nodejs-icon-sticker.png": ["lib/cv-data.ts"],
    "email-icon-sticker.png": ["components/contact/sticker-vectors.tsx"],
    "github-icon-sticker.png": ["components/contact/sticker-vectors.tsx"],
    "linkedin-icon-sticker.png": ["components/contact/sticker-vectors.tsx"],
    "instagram-icon-sticker.png": ["components/contact/sticker-vectors.tsx"],
    "threads-icon-sticker.png": ["components/contact/sticker-vectors.tsx"],
    "www-icon-sticker.png": ["components/contact/sticker-vectors.tsx"],
    "cv-resume-icon-sticker.png": ["components/contact/sticker-vectors.tsx"],
    "avatar-icon-sticker.png": ["components/contact/sticker-vectors.tsx"],
    "open-to-work-icon-sticker.png": ["components/contact/sticker-vectors.tsx"],
    "strava-icon-sticker.png": ["components/contact/sticker-vectors.tsx"],
    "youtube-icon-sticker.png": ["components/contact/sticker-vectors.tsx"],
    "pixel-art-business-avatar-sticker.png": ["components/vexoo-dashboard.tsx"],
}

# Per-asset optical scale overrides
OPTICAL_TARGET_OVERRIDES: Dict[str, Dict[str, Any]] = {
    "avatar-icon-sticker.png": {
        "profile": "avatar",
        "target_dim": 900,
        "reason": "Profile avatar sticker. Centered on 1024x1024 canvas with avatar portrait framing.",
    },
    "pixel-art-business-avatar-sticker.png": {
        "profile": "avatar",
        "target_dim": 900,
        "reason": "Dashboard portrait sticker. Centered on 1024x1024 canvas with portrait framing.",
    },
}


@dataclass
class StickerInventoryItem:
    filename: str
    relative_path: str
    group: str
    dimensions: Tuple[int, int]
    color_mode: str
    has_alpha: bool
    raw_bbox: Tuple[int, int, int, int]
    filtered_bbox: Tuple[int, int, int, int]
    artwork_size: Tuple[int, int]
    artwork_aspect: float
    max_artwork_dim: int
    alpha_occupancy_ratio: float
    transparent_margins: Dict[str, int]
    sha256: str
    external_references: List[str]
    notes: str = ""


@dataclass
class NormalizationCandidate:
    filename: str
    source_origin: str
    source_dimensions: Tuple[int, int]
    source_filtered_bbox: Tuple[int, int, int, int]
    cropped_artwork_size: Tuple[int, int]
    target_canvas: Tuple[int, int]
    scaled_artwork_size: Tuple[int, int]
    scaling_factor: float
    scaling_method: str
    output_bbox: Tuple[int, int, int, int]
    output_margins: Dict[str, int]
    output_occupancy: float
    optical_correction: str
    silhouette_class: str
    css_mobile_size: Tuple[float, float]
    css_tablet_size: Tuple[float, float]
    css_desktop_size: Tuple[float, float]
    css_desktop_hover_size: Tuple[float, float]
    css_desktop_area: float
    validation_status: str
    warnings: List[str] = field(default_factory=list)


def compute_sha256(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        while chunk := f.read(65536):
            h.update(chunk)
    return h.hexdigest()


def classify_silhouette(aspect: float, filename: str) -> str:
    if filename in AVATAR_STICKERS:
        return "portrait_avatar"
    if aspect > 2.0:
        return "wide_wordmark"
    elif aspect > 1.10:
        return "moderately_horizontal"
    elif aspect < 0.90:
        return "tall_vertical"
    else:
        return "square_near_square"


def analyze_sticker(path: Path) -> StickerInventoryItem:
    filename = path.name
    rel_path = f"public/images/pixel-art-sticker/{filename}"
    sha = compute_sha256(path)

    try:
        im = Image.open(path)
    except Exception as e:
        raise ValueError(f"Failed to open image at {path}: {e}")

    w, h = im.size
    mode = im.mode
    has_alpha = "A" in mode

    raw_bbox = im.getbbox() or (0, 0, 0, 0)

    # Filtered bbox (alpha threshold > 10)
    if has_alpha:
        alpha = im.split()[-1]
        mask10 = alpha.point(lambda p: 255 if p > 10 else 0)
        filtered_bbox = mask10.getbbox() or (0, 0, 0, 0)
        non_zero = sum(1 for p in alpha.get_flattened_data() if p > 10)
        occupancy = non_zero / (w * h)
    else:
        filtered_bbox = raw_bbox
        occupancy = 1.0

    fx0, fy0, fx1, fy1 = filtered_bbox
    aw = fx1 - fx0
    ah = fy1 - fy0
    aspect = aw / ah if ah > 0 else 1.0
    max_dim = max(aw, ah)

    margins = {
        "top": fy0,
        "bottom": h - fy1,
        "left": fx0,
        "right": w - fx1,
    }

    if filename in ACTIVE_TECH_STICKERS:
        group = "active_tech"
    elif filename in RESERVED_TECH_STICKERS:
        group = "reserved_tech"
    elif filename in SOCIAL_STICKERS:
        group = "social_communication"
    elif filename in AVATAR_STICKERS:
        group = "avatar_profile"
    else:
        group = "unclassified"

    refs = EXTERNAL_REFERENCES.get(filename, [])

    return StickerInventoryItem(
        filename=filename,
        relative_path=rel_path,
        group=group,
        dimensions=(w, h),
        color_mode=mode,
        has_alpha=has_alpha,
        raw_bbox=raw_bbox,
        filtered_bbox=filtered_bbox,
        artwork_size=(aw, ah),
        artwork_aspect=round(aspect, 3),
        max_artwork_dim=max_dim,
        alpha_occupancy_ratio=round(occupancy, 4),
        transparent_margins=margins,
        sha256=sha,
        external_references=refs,
    )


def normalize_image(
    src_path: Path,
    out_path: Path,
    canvas_size: int = 1024,
    default_target_dim: int = 920,
    alpha_threshold: int = 10,
    origin_label: str = "canonical_root",
) -> NormalizationCandidate:
    filename = src_path.name
    try:
        im = Image.open(src_path).convert("RGBA")
    except Exception as e:
        raise ValueError(f"Corrupt or invalid image at {src_path}: {e}")

    sw, sh = im.size

    # 1. Detect filtered alpha bounding box
    alpha = im.split()[-1]
    mask = alpha.point(lambda p: 255 if p > alpha_threshold else 0)
    bbox = mask.getbbox()

    if not bbox:
        raise ValueError(f"Image {filename} has no visible pixels above threshold {alpha_threshold}")

    x0, y0, x1, y1 = bbox
    cw = x1 - x0
    ch = y1 - y0

    # 2. Crop to artwork bounds
    cropped = im.crop(bbox)

    # Clean residual near-zero alpha noise in cropped area
    r, g, b, a = cropped.split()
    clean_a = a.point(lambda p: p if p > alpha_threshold else 0)
    cleaned = Image.merge("RGBA", (r, g, b, clean_a))

    # 3. Determine target optical dimension
    override = OPTICAL_TARGET_OVERRIDES.get(filename, {})
    target_dim = override.get("target_dim", default_target_dim)
    optical_reason = override.get("reason", "Standard canonical target scale (920px dominant dimension).")

    # 4. Check if image is ALREADY normalized to avoid redundant resampling
    max_c = max(cw, ch)
    scale = target_dim / max_c
    new_w = int(round(cw * scale))
    new_h = int(round(ch * scale))

    is_already_normalized = (
        sw == canvas_size
        and sh == canvas_size
        and max_c == target_dim
        and abs(x0 - (canvas_size - cw) // 2) <= 1
        and abs(y0 - (canvas_size - ch) // 2) <= 1
    )

    if is_already_normalized:
        scaled = cleaned
        scaling_method = "Lossless Passthrough (Already Normalized)"
        scale = 1.0
        new_w, new_h = cw, ch
    else:
        scaled = cleaned.resize((new_w, new_h), Image.Resampling.LANCZOS)
        scaling_method = "Lanczos (Resampling.LANCZOS)"

    # 5. Paste centered on standardized canvas
    canvas = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    paste_x = (canvas_size - new_w) // 2
    paste_y = (canvas_size - new_h) // 2
    canvas.paste(scaled, (paste_x, paste_y), scaled)

    # 6. Save candidate PNG non-destructively
    out_path.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(out_path, format="PNG", optimize=True)

    # 7. Analyze resulting output
    out_alpha = canvas.split()[-1]
    out_bbox = out_alpha.getbbox() or (0, 0, 0, 0)
    ox0, oy0, ox1, oy1 = out_bbox

    out_margins = {
        "top": oy0,
        "bottom": canvas_size - oy1,
        "left": ox0,
        "right": canvas_size - ox1,
    }

    non_zero = sum(1 for p in out_alpha.get_flattened_data() if p > 0)
    out_occ = non_zero / (canvas_size * canvas_size)

    aspect = new_w / new_h
    silhouette = classify_silhouette(aspect, filename)

    css_m_w = round(new_w * 72 / canvas_size, 1)
    css_m_h = round(new_h * 72 / canvas_size, 1)
    css_t_w = round(new_w * 80 / canvas_size, 1)
    css_t_h = round(new_h * 80 / canvas_size, 1)
    css_d_w = round(new_w * 88 / canvas_size, 1)
    css_d_h = round(new_h * 88 / canvas_size, 1)
    css_h_w = round(css_d_w * 1.1, 1)
    css_h_h = round(css_d_h * 1.1, 1)
    desktop_area = round(css_d_w * css_d_h, 1)

    warnings = []
    status = "VALID"

    if canvas.size != (canvas_size, canvas_size):
        status = "INVALID"
        warnings.append(f"Canvas size mismatch: {canvas.size} != {(canvas_size, canvas_size)}")

    if ox0 < 20 or oy0 < 20 or ox1 > (canvas_size - 20) or oy1 > (canvas_size - 20):
        warnings.append(f"Output artwork close to canvas edge: bbox={out_bbox}")

    aspect_orig = cw / ch
    if abs(aspect_orig - aspect) > 0.02:
        warnings.append(f"Aspect ratio drift: {aspect_orig:.3f} -> {aspect:.3f}")

    if aspect > 2.0:
        warnings.append(f"Extreme aspect ratio ({aspect:.2f}): Wide wordmark silhouette naturally has lower visible height in a square container.")

    return NormalizationCandidate(
        filename=filename,
        source_origin=origin_label,
        source_dimensions=(sw, sh),
        source_filtered_bbox=bbox,
        cropped_artwork_size=(cw, ch),
        target_canvas=(canvas_size, canvas_size),
        scaled_artwork_size=(new_w, new_h),
        scaling_factor=round(scale, 4),
        scaling_method=scaling_method,
        output_bbox=out_bbox,
        output_margins=out_margins,
        output_occupancy=round(out_occ, 4),
        optical_correction=optical_reason,
        silhouette_class=silhouette,
        css_mobile_size=(css_m_w, css_m_h),
        css_tablet_size=(css_t_w, css_t_h),
        css_desktop_size=(css_d_w, css_d_h),
        css_desktop_hover_size=(css_h_w, css_h_h),
        css_desktop_area=desktop_area,
        validation_status=status,
        warnings=warnings,
    )


def validate_candidates(
    inventory: List[StickerInventoryItem],
    candidates: List[NormalizationCandidate],
    source_dir: Path,
    original_hashes: Dict[str, str],
) -> Dict[str, Any]:
    cand_by_file = {c.filename: c for c in candidates}
    report: Dict[str, Any] = {
        "total_inventoried": len(inventory),
        "total_candidates": len(candidates),
        "active_tech_count": len([i for i in inventory if i.group == "active_tech"]),
        "active_tech_covered": 0,
        "source_files_unmodified": True,
        "invalid_candidates": [],
        "all_checks_passed": True,
    }

    for item in inventory:
        path = source_dir / item.filename
        current_hash = compute_sha256(path)
        if current_hash != original_hashes[item.filename]:
            report["source_files_unmodified"] = False
            report["all_checks_passed"] = False

    for item in inventory:
        if item.group == "active_tech":
            if item.filename in cand_by_file:
                report["active_tech_covered"] += 1
            else:
                report["all_checks_passed"] = False
                report["invalid_candidates"].append(f"Missing active technology: {item.filename}")

    for c in candidates:
        if c.validation_status != "VALID":
            report["all_checks_passed"] = False
            report["invalid_candidates"].append(f"{c.filename}: {c.validation_status}")

    return report


def main():
    parser = argparse.ArgumentParser(description="Pixel-Art Sticker Normalization Pipeline (Phase 2.5C Reusable Utility)")
    parser.add_argument("--input-dir", type=Path, default=DEFAULT_STICKER_DIR, help="Input directory containing sticker PNGs")
    parser.add_argument("--input-file", type=Path, default=None, help="Process a single sticker PNG file")
    parser.add_argument("--output-dir", type=Path, default=DEFAULT_OUTPUT_DIR, help="Output staging directory")
    parser.add_argument("--inventory", action="store_true", help="Run sticker inventory only")
    parser.add_argument("--normalize", action="store_true", help="Generate normalized candidates")
    parser.add_argument("--validate", action="store_true", help="Validate candidates")
    parser.add_argument("--all", action="store_true", help="Run full inventory, normalize, and validate")
    args = parser.parse_args()

    if not (args.inventory or args.normalize or args.validate or args.all):
        args.all = True

    output_dir: Path = args.output_dir
    candidates_dir = output_dir / CANDIDATES_DIR_NAME

    # Single-file processing mode
    if args.input_file:
        src_file = args.input_file.resolve()
        if not src_file.exists() or not src_file.is_file():
            print(f"Error: Specified input file '{src_file}' does not exist.", file=sys.stderr)
            sys.exit(1)

        dst_file = output_dir / src_file.name
        print(f"[*] Normalizing single file: {src_file.name} -> {dst_file}")
        cand = normalize_image(src_file, dst_file, origin_label="single_file_cli")
        print(f"[+] Output: {dst_file} (Status: {cand.validation_status}, Scaling: {cand.scaling_method})")
        return

    # Directory batch processing mode
    source_dir: Path = args.input_dir.resolve()
    if not source_dir.exists() or not source_dir.is_dir():
        print(f"Error: Specified input directory '{source_dir}' does not exist.", file=sys.stderr)
        sys.exit(1)

    files = sorted([f for f in os.listdir(source_dir) if f.endswith(".png")])
    if not files:
        print(f"[*] No PNG files found in {source_dir}.")
        return

    original_hashes = {f: compute_sha256(source_dir / f) for f in files}
    inventory = [analyze_sticker(source_dir / f) for f in files]

    print(f"[*] Found {len(inventory)} sticker PNG files in {source_dir}")
    groups_summary = {}
    for item in inventory:
        groups_summary[item.group] = groups_summary.get(item.group, 0) + 1
    for grp, cnt in sorted(groups_summary.items()):
        print(f"    - {grp}: {cnt} files")

    candidates: List[NormalizationCandidate] = []

    if args.normalize or args.all:
        output_dir.mkdir(parents=True, exist_ok=True)
        candidates_dir.mkdir(parents=True, exist_ok=True)
        print(f"\n[*] Generating normalized candidates in {candidates_dir}...")

        for item in inventory:
            src = source_dir / item.filename
            dst = candidates_dir / item.filename
            cand = normalize_image(src, dst, origin_label="canonical_root")
            candidates.append(cand)

        print(f"[+] Successfully processed {len(candidates)} candidate normalized PNGs.")

    # Validation
    val_report = validate_candidates(inventory, candidates, source_dir, original_hashes)
    print(f"\n[*] Validation Results:")
    print(f"    - Source PNG files unmodified: {val_report['source_files_unmodified']}")
    print(f"    - Active tech stickers covered: {val_report['active_tech_covered']} / {val_report['active_tech_count']}")
    print(f"    - All checks passed: {val_report['all_checks_passed']}")

    # Write Manifest
    manifest_data = {
        "pipeline_version": "2.5C",
        "standard_canvas": "1024x1024",
        "dominant_artwork_target": 920,
        "dominant_margin_target": 52,
        "alpha_threshold": 10,
        "resampling_algorithm": "Lanczos (Resampling.LANCZOS) with Lossless Passthrough",
        "css_breakpoints": {
            "mobile": "size-18 (72x72px)",
            "tablet": "sm:size-20 (80x80px)",
            "desktop": "lg:size-22 (88x88px)",
            "desktop_hover": "scale-110 (96.8x96.8px)",
        },
        "summary": groups_summary,
        "validation": val_report,
        "inventory": [asdict(i) for i in inventory],
        "candidates": [asdict(c) for c in candidates],
    }

    manifest_path = output_dir / "manifest.json"
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest_data, f, indent=2)
    print(f"[+] Manifest written to {manifest_path}")

    # Write Human-Readable Markdown Report
    report_path = output_dir / "normalization-report.md"
    cand_map = {c.filename: c for c in candidates}

    with open(report_path, "w", encoding="utf-8") as f:
        f.write("# Laporan Normalisasi Stiker Piksel Kanonikal — Pipeline 2.5C\n\n")
        f.write(f"- **Total Berkas Discan:** {len(inventory)}\n")
        f.write(f"- **Kandidat Ternormalisasi:** {len(candidates)}\n")
        f.write(f"- **Standar Kanvas:** 1024×1024 RGBA Transparan Penuh\n")
        f.write(f"- **Target Dimensi Dominan:** 920px (Margin ~52px)\n")
        f.write(f"- **CSS Breakpoints:** Mobile (`72px`), Tablet (`80px`), Desktop (`88px`), Hover (`96.8px`)\n")
        f.write(f"- **Status Validasi:** {'LOLOS 100%' if val_report['all_checks_passed'] else 'PERLU PERHATIAN'}\n\n")

        f.write("## 1. Analisis Ukuran Render CSS Riil (36 Stiker Teknologi Aktif)\n\n")
        f.write("| File | Kategori | Sumber Asal | Siluet | Aspek | Art Size (1024) | Render Mobile (72px) | Render Tablet (80px) | Render Desktop (88px) | Area Desktop (px²) |\n")
        f.write("|---|---|---|---|---|---|---|---|---|---|\n")
        for item in inventory:
            if item.group == "active_tech":
                c = cand_map.get(item.filename)
                if c:
                    f.write(
                        f"| `{item.filename}` | `{ACTIVE_TECH_STICKERS[item.filename]['category']}` | "
                        f"`{c.source_origin}` | `{c.silhouette_class}` | "
                        f"{c.cropped_artwork_size[0]/c.cropped_artwork_size[1]:.2f} | "
                        f"{c.scaled_artwork_size[0]}×{c.scaled_artwork_size[1]} | "
                        f"{c.css_mobile_size[0]}×{c.css_mobile_size[1]}px | "
                        f"{c.css_tablet_size[0]}×{c.css_tablet_size[1]}px | "
                        f"{c.css_desktop_size[0]}×{c.css_desktop_size[1]}px | "
                        f"{c.css_desktop_area:.0f} |\n"
                    )

        f.write("\n## 2. Stiker Cadangan, Sosial & Avatar\n\n")
        f.write("| File | Grup | Siluet | Aspek | Art Size (1024) | Render Desktop (88px) | Area Desktop (px²) | Status |\n")
        f.write("|---|---|---|---|---|---|---|---|\n")
        for item in inventory:
            if item.group != "active_tech":
                c = cand_map.get(item.filename)
                if c:
                    f.write(
                        f"| `{item.filename}` | `{item.group}` | `{c.silhouette_class}` | "
                        f"{c.cropped_artwork_size[0]/c.cropped_artwork_size[1]:.2f} | "
                        f"{c.scaled_artwork_size[0]}×{c.scaled_artwork_size[1]} | "
                        f"{c.css_desktop_size[0]}×{c.css_desktop_size[1]}px | "
                        f"{c.css_desktop_area:.0f} | **{c.validation_status}** |\n"
                    )

    print(f"[+] Report written to {report_path}")


if __name__ == "__main__":
    main()
