# DESIGN.md
## HP-inspired Enterprise Presentation Design Guide

> Purpose: Use this file as a visual-direction reference for AI coding agents when creating a web-based presentation, landing page, or slide deck.
>
> Important: This is an independent design guide inspired by common enterprise technology presentation patterns. Do not use HP logos, trademarks, proprietary assets, or copy HP layouts verbatim.

---

## 1. Design Goal

Create a clean, credible, enterprise-grade presentation for an AX education program.

The visual system should feel:

- Clear and practical
- Technology-oriented
- Suitable for B2B education
- Easy to scan during a live presentation
- Modern without looking decorative or playful

Use a white canvas for most slides, a strong blue accent for actions and highlights, and dark navy sections for emphasis.

---

## 2. Presentation Context

### Audience
Prospective instructors participating in a practical AX instructor training program.

### Core Message
Do not use AI only for search. Use AI to build materials, workflows, and reusable teaching assets.

### Suggested Title
**검색만 하지 말고, 만들어 쓰세요**  
강사를 위한 실전 AI 활용 전략

### Recommended Duration
20 minutes

### Recommended Slide Count
16–18 slides

---

## 3. Visual Principles

### Layout
- Use a 16:9 presentation ratio.
- Keep one main message per slide.
- Prefer generous whitespace.
- Use a strong visual hierarchy:
  1. Slide title
  2. Key statement
  3. Supporting content
  4. Optional note or source
- Align most elements to a consistent left grid.
- Use centered layouts only for opening, section-divider, and closing slides.
- Use large geometric blocks sparingly.

### Content Density
- Limit body text to 3–5 short lines per section.
- Use no more than 3 main bullets per slide where possible.
- Convert long explanations into diagrams, step cards, or before/after comparisons.
- Avoid dense paragraphs.

### Decorative Elements
- Use angular chevron or forward-motion motifs as subtle accents.
- Keep accents in corners, separators, or section transitions.
- Do not overuse decorative shapes.
- Avoid rounded, playful illustrations unless the topic requires them.

---

## 4. Color System

Use accessible contrast and keep the palette restrained.

### Primary Colors

| Token | Value | Usage |
|---|---|---|
| `--color-navy-900` | `#0B2A6F` | Dark section backgrounds, high-emphasis blocks |
| `--color-blue-700` | `#0057B8` | Primary accent, buttons, key numbers |
| `--color-blue-500` | `#2D7FF9` | Supporting accent, diagrams, highlights |
| `--color-blue-100` | `#EAF3FF` | Soft background panels |
| `--color-white` | `#FFFFFF` | Main background |
| `--color-gray-900` | `#111827` | Main text |
| `--color-gray-600` | `#4B5563` | Secondary text |
| `--color-gray-200` | `#E5E7EB` | Borders and separators |
| `--color-gray-050` | `#F8FAFC` | Soft section background |

### Usage Rules
- Use white backgrounds for most content slides.
- Use dark navy backgrounds for section dividers and closing slides.
- Use blue only to guide attention.
- Use one primary accent per slide.
- Avoid using more than three saturated colors on one slide.

---

## 5. Typography

### Recommended Korean Font Stack
```css
font-family:
  Pretendard,
  "Noto Sans KR",
  "Apple SD Gothic Neo",
  Arial,
  sans-serif;
```

### Scale

| Role | Size | Weight | Notes |
|---|---:|---:|---|
| Cover title | 56–72 px | 700–800 | Keep line count under 3 |
| Section title | 44–56 px | 700 | Use on dark or white background |
| Slide title | 34–44 px | 700 | Main hierarchy anchor |
| Key statement | 26–34 px | 600–700 | Use for the central message |
| Body text | 18–24 px | 400–500 | Keep concise |
| Caption | 14–18 px | 400 | Optional |
| Key number | 56–96 px | 700–800 | Use blue accent |

### Typography Rules
- Use bold weights for titles and numbers.
- Keep body copy neutral and readable.
- Avoid long centered paragraphs.
- Use line-height between 1.35 and 1.6.
- Avoid using more than two font families.

---

## 6. Spacing and Grid

Use an 8-point spacing system.

| Token | Value |
|---|---:|
| `--space-1` | `8px` |
| `--space-2` | `16px` |
| `--space-3` | `24px` |
| `--space-4` | `32px` |
| `--space-5` | `40px` |
| `--space-6` | `48px` |
| `--space-8` | `64px` |
| `--space-10` | `80px` |

### Slide Padding
- Desktop slide canvas: `64px 80px`
- Content block gap: `24px–40px`
- Card padding: `24px–32px`
- Large section gap: `48px–64px`

---

## 7. Components

### 7.1 Cover Slide
Use:
- Large left-aligned title
- Short subtitle
- Small program label or session name
- One restrained geometric visual on the right
- White background or navy background

Avoid:
- Too many icons
- Long introductory text
- Decorative photos without a clear purpose

### 7.2 Section Divider
Use:
- Navy background
- White title
- Optional blue angular accent
- A single short sentence

### 7.3 Step Cards
Use for workflows such as:
- Before class
- During class
- After class

Style:
- White or pale-blue card
- Thin gray border
- Minimal shadow
- Numbered header
- One concise example

### 7.4 Comparison Slide
Use a two-column comparison:
- Left: weak or inefficient approach
- Right: improved approach
- Use gray for the left column
- Use blue accent for the right column

### 7.5 Checklist Slide
Use:
- 4–6 items maximum
- Check icons
- Short labels
- Optional one-line explanation

### 7.6 Callout Block
Use for:
- Key principle
- Practical tip
- Safety warning
- Next action

Style:
- Blue-tinted background
- Strong left border
- Bold headline
- No more than two lines of supporting text

### 7.7 Closing Slide
Use:
- Dark navy background
- One strong takeaway
- Optional 3-step action plan
- Minimal footer

---

## 8. Slide Structure Recommendation

1. Cover — 검색만 하지 말고, 만들어 쓰세요
2. Why AX capability matters for instructors
3. The limitation of using AI only as a search tool
4. Instructor workflow: before, during, and after class
5. Before class: draft a lecture outline
6. Before class: adjust difficulty by learner type
7. During class: respond to learner questions
8. During class: create a worksheet in real time
9. After class: analyze feedback
10. Prompt structure: role, context, task, format, criteria
11. Before-and-after prompt comparison
12. Practice 1: create a lecture outline
13. Practice 2: create a learner worksheet
14. Practice 3: create evaluation questions
15. Verification checklist
16. Privacy, copyright, and fact-checking
17. One-week action plan
18. Closing — Move from searching to building

---

## 9. Prompt Template for AI Coding Agents

Copy and use the following prompt after adding this file to the repository root.

```text
Read DESIGN.md and use it as the visual design reference.

Create a 16:9 HTML presentation for a 20-minute AX instructor training session.

Requirements:
- Use the slide structure defined in DESIGN.md.
- Build 16–18 slides.
- Use a white-first enterprise design with blue accents and occasional dark-navy section slides.
- Use restrained angular chevron motifs.
- Keep one core message per slide.
- Avoid dense text.
- Include presenter notes for each slide.
- Add keyboard navigation with left and right arrow keys.
- Make the layout responsive.
- Do not use HP logos, trademarks, or proprietary assets.
- Do not copy an existing branded page verbatim.
```

---

## 10. Optional CSS Variables

```css
:root {
  --color-navy-900: #0B2A6F;
  --color-blue-700: #0057B8;
  --color-blue-500: #2D7FF9;
  --color-blue-100: #EAF3FF;
  --color-white: #FFFFFF;
  --color-gray-900: #111827;
  --color-gray-600: #4B5563;
  --color-gray-200: #E5E7EB;
  --color-gray-050: #F8FAFC;

  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-5: 40px;
  --space-6: 48px;
  --space-8: 64px;
  --space-10: 80px;

  --radius-card: 8px;
  --shadow-card: 0 10px 30px rgba(15, 23, 42, 0.08);
}
```

---

## 11. Quality Checklist

Before finalizing the presentation, verify:

- [ ] Every slide has one clear message.
- [ ] Titles are readable from a distance.
- [ ] Body text is not overloaded.
- [ ] Blue accents are used intentionally.
- [ ] Dark slides are limited to emphasis moments.
- [ ] The layout is consistent across slides.
- [ ] The deck does not use HP logos or proprietary assets.
- [ ] The deck works on desktop and mobile screens.
- [ ] Keyboard navigation works.
- [ ] Presenter notes are included.
