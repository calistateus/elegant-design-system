# CaseStudyCard Spec

**Component**: `src/components/simple/CaseStudyCard.tsx`  
**Story**: `src/stories/CaseStudyCard.stories.tsx`  
**Mode**: Simple / TypeUI Elegant

## Data Source
Pulls from `CaseStudy` interface in `src/data/content.ts`:
- `id` — string key
- `tags` — string[] rendered as eyebrow labels
- `title` — card heading
- `description` — body copy
- `outcome` — highlighted result line (accent color)
- `imagePath` — image URL for the card thumbnail

## Layout
```
[ Image container (16:9, overflow hidden, GSAP scale target) ]
[ Eyebrow tags row ]
[ Title ]
[ Description ]
[ Outcome ]
```

## Typography (all values from `context/tokens/typography-tokens.json`)
| Element     | Role in token file | Notes                        |
|-------------|-------------------|------------------------------|
| Tags        | `eyebrow`         | Uppercase, 0.1em spacing     |
| Title       | serif, `fontSize.2xl`, weight regular | `-0.02em` tracking |
| Description | `body-small`      | `text.body` color            |
| Outcome     | `body-small`      | `text.accent` color, medium weight |

## Color Tokens
- Background: `semantic.background.surface` (#FAFAFA)
- Border: `semantic.border.subtle` (#F5F5F5)
- Tag text: `semantic.text.muted` (#666666)
- Title: `semantic.text.title` (#111111)
- Body: `semantic.text.body` (#171717)
- Outcome: `semantic.text.accent` (#0070F3)

## Motion
GSAP hover on the **image `div` ref** (not the wrapper):
- `onMouseEnter` → `gsap.to(ref, { scale: 1.05, duration: 0.35, ease: 'power2.out' })`
- `onMouseLeave` → `gsap.to(ref, { scale: 1, duration: 0.35, ease: 'power2.inOut' })`
- Scale value sourced from `colorTokens.primitive.scale.subtle`

## Storybook Variants
- `UnitedNations` — UN / Mobile Experience
- `NewYorkLife` — NYL / Calculators
- `USAA` — USAA / Design Systems
