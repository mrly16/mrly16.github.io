# Portfolio Design Direction

## Purpose

The portfolio should feel like a personal visual publication, not a product
landing page or a reusable personal-brand template.

Its design should demonstrate taste through execution. It should not explain,
name, or advertise that taste in the site's copy.

## Core Principles

- Create a quiet, high-end, and clearly authored visual experience.
- Lead narration with images and visual evidence.
- Express design sensibility through composition, proportion, rhythm, and
  restraint rather than explicit themes.
- Give each project a storytelling structure suited to its substance instead of
  forcing every case study into the same template.
- Use interaction to reveal information, comparison, process, or reasoning.
  Avoid motion that exists only as decoration.
- Maintain a coherent overall visual system without making every page look
  structurally identical.

## Visual Qualities

- Precise hierarchy and typography
- Deliberate use of whitespace
- Strong image selection, sequencing, scale, and cropping
- Controlled contrast between quiet editorial space and immersive visuals
- Consistent material, lighting, color, and motion decisions
- Fewer visible cards, containers, badges, and repeated interface patterns
- Asymmetry and variation used intentionally rather than randomly

## Content Presentation

- Show evidence rather than relying on capability claims.
- Let diagrams, screenshots, outputs, comparisons, and process artifacts carry
  substantial parts of the narrative.
- Allow technical depth to emerge progressively instead of presenting every
  detail at the same visual level.
- Preserve honest boundaries between personal ownership, team contributions,
  implemented work, and future directions.
- Keep written narration concise enough that visuals remain central.

## Primary Entry Experience

The portfolio homepage should not begin as a conventional landing page. It
should open directly into an immersive, visual project-viewing experience that
feels closer to a curated series or channel than a grid of portfolio cards.

The first screen should capture attention through motion, imagery, sound when
appropriate, and a strong sense of sequence. Projects are presented as
distinct episodes within one authored body of work.

### Project Controller

A persistent controller allows visitors to:

- switch directly between projects,
- move to the previous or next project,
- pause or resume the current visual sequence,
- inspect a concise project title and context,
- open the full case study when the project earns their interest,
- access a quieter index or conventional navigation at any time.

The controller may borrow the interaction logic of a television remote or
channel guide, but its visual identity must be original and consistent with the
portfolio's own design system.

### Project Episodes

Each project should have a short, art-directed visual sequence rather than a
generic hero image. The sequence may combine:

- motion graphics,
- project footage,
- interface fragments,
- outputs and evidence,
- concise typography,
- diagrams,
- transitions between inputs, decisions, systems, and results.

These sequences are introductions, not substitutes for technical depth. Their
purpose is to create immediate curiosity and communicate the character of the
work before asking the visitor to read.

### Detailed Case Studies

Visitors who select a project can enter a dedicated case-study page containing
the deeper material currently represented in the portfolio:

- problem and constraints,
- ownership and team boundaries,
- system architecture,
- important decisions and rejected alternatives,
- evidence and measured results,
- lessons and disclosure boundaries.

Detailed pages should not all share one rigid template. Their editorial
structure and visual rhythm should reflect the nature of each project.

### Interaction Requirements

- Project switching should feel immediate and intentional.
- Transitions should preserve spatial and narrative continuity.
- Direct links to individual projects and case studies must remain available.
- Keyboard, touch, reduced-motion, and muted-media experiences must be
  first-class.
- The experience should not require sound or autoplay permission to make sense.
- Visitors should never be trapped in the immersive interface.
- Loading strategy must prevent large project media from delaying the first
  meaningful frame.
- Refresh and first paint must be visually stable. Do not rely on post-load
  transforms, entrance animations, delayed fitting, or hydration-time layout
  corrections for core navigation, identity, media frames, or project controls.

### Intended Effect

The entry experience should feel like beginning a carefully directed series of
work, not arriving at a page that asks the visitor to evaluate claims and click
through cards.

The visual sequence earns attention. The detailed case study earns trust.

## What To Avoid

- SaaS-style conversion funnels and repeated calls to action
- Generic portfolio or agency templates
- Generic AI-futuristic visual language
- Treating the person as a product being marketed
- Decorative visual effects disconnected from the work
- A forced architectural theme in wording, imagery, or subject matter
- Explaining the desired aesthetic directly to visitors
- Selecting a metaphor, motif, palette, or gimmick before the broader visual
  direction has been explored
- Copying the surface styling of television, streaming, or media applications
- Making the project controller more visually important than the work
- Turning project narratives into generic trailers or promotional reels

## Working Standard

Visitors should understand the author's taste from how the site feels and how
the work is presented. The portfolio should not need to announce that it is
designed, sophisticated, architectural, creative, or high-end.

Future design decisions should be evaluated against this question:

> Does this make the work feel more specifically authored and easier to
> experience, or does it make the portfolio resemble a polished template?

## Flow TV Study and Reflection

Flow TV is useful as a reference because of its viewing logic, not because its
surface styling should be copied.

The current portfolio implementation transferred much of Flow TV's feature
inventory, including project switching, playback controls, a guide, and a
full-viewport presentation. It did not yet transfer enough of the reference's
visual hierarchy or experiential discipline. It was coded before the
composition was sufficiently designed.

### What Flow TV Does Well

#### Media is the protagonist

The central video occupies the dominant visual field. Titles, metadata, search,
navigation, and controls remain subordinate. The interface does not ask the
visitor to read several competing messages before engaging with the work.

#### The interface creates a stage

Large areas of black space isolate the video and controller. This negative
space is functional: it focuses attention and makes the media feel like an
event rather than another section of a webpage.

#### One experience occupies the viewport

Flow TV avoids a scrolling landing-page structure. There is no simultaneous
hero message, metric band, card grid, capability section, and call to action.
Everything visible supports watching, understanding, or switching the current
piece.

#### The controller is a designed object

Controls are consolidated into one substantial console with visible mass,
grouped functions, and clear state. It feels connected to the media frame
rather than attached as a generic toolbar.

#### Information is progressively disclosed

Prompt details, generation method, playback state, secondary views, and channel
navigation are available without being equally prominent. The visitor can
understand the primary experience before deciding how deeply to inspect it.

#### Navigation follows the viewing metaphor

Channels contain multiple videos. Playback controls navigate within a channel,
while channel controls move between bodies of work. This gives each control a
meaningful and predictable scope.

#### The interface remains visually neutral

The UI typography and iconography prioritize clarity. Personality comes from
the media rather than decorative interface styling. Motion communicates state
changes instead of acting as independent spectacle.

### Problems in the Current Portfolio Skeleton

- The large project title competes directly with the project visual.
- The composition remains text-led, with an image supporting the narration.
- Architecture diagrams behave like landing-page hero illustrations rather
  than media being watched or inspected.
- The controller reads as a styled footer toolbar rather than a coherent
  instrument.
- Summary, metrics, call to action, project image, navigation, and title all
  demand attention at the same time.
- The full-bleed arrangement loses the useful stage space that isolates and
  elevates the work.
- Switching projects changes static content but does not yet feel like entering
  a distinct project world.
- The conventional portfolio header competes with the more immersive viewing
  model.
- Playback is currently metaphorical because each project contains only one
  static frame rather than an actual sequence.

These are design problems, not missing CSS polish.

### How the Reference Should Inform This Portfolio

The portfolio should borrow Flow TV's composition and behavioral hierarchy
while developing a different visual identity.

#### Central project screen

A centered media frame should occupy approximately 60 to 70 percent of the
available viewport height. It may use a 16:9 or slightly wider proportion,
depending on the project material.

Each project should eventually contain a short sequence of authored scenes:

1. The original problem, input, or operational environment
2. The important technical transformation
3. The resulting system, interface, or output
4. Verified evidence or measured impact

The project title may appear as part of the sequence, but it should not
permanently consume half of the viewport.

#### Project console

One substantial console should sit beneath the project screen. It should have
three understandable zones:

- **Playback:** previous scene, play or pause, and next scene
- **Context:** current scene title and one concise explanatory sentence
- **Project channel:** current project identity and previous or next project

The link to the full case study belongs inside this system as a secondary
inspection action.

#### Two navigation levels

The interaction model should clearly distinguish:

- **Scenes**, which move through the visual narrative of one project
- **Channels**, which switch between different projects

Without this distinction, television and playback controls become decorative
metaphors instead of useful interaction.

#### Quiet peripheral navigation

Name, language, About, Contact, and the conventional project index should remain
available at the edges of the interface. They should not form a visually
dominant website header across the project stage.

#### Project-specific visual behavior

The controller can remain consistent while the media direction changes for
each project:

- Floor-plan reconstruction can move from raster input through segmentation,
  geometry, topology, and editable output.
- Video intelligence can show multiple streams converging into detected events,
  evidence, comparison, and replay.
- LookX can transform sketches or model screenshots into controlled rendering
  results while showing the reduction in user complexity.
- Multimodal asset search can begin with an unmanageable image field and
  collapse it around text, image, tag, or caption queries.
- CAD recognition can turn dense drawing entities into recognized objects,
  annotations, semantic relationships, and structured BIM information.

Each sequence should express the character of its system rather than placing
different diagrams inside one repeated animation template.

### Distinct Visual Identity

The portfolio should not copy Flow TV's blue-gray console, heavy rounded
geometry, or Google product styling.

A more suitable direction includes:

- warm black rather than absolute black,
- ivory and muted material tones,
- precise hairlines and controlled contrast,
- restrained project-specific accent colors,
- flatter and sharper console geometry,
- subtle depth and illumination,
- expressive editorial typography inside project media,
- neutral and highly legible typography for interface controls.

The relationship to the reference should be summarized as:

> Flow TV provides the viewing logic. The projects provide the visual identity.

### Design Before Further Implementation

Before adding more interaction code, the next iteration should establish a
static composition for:

- the project screen,
- the surrounding stage,
- the controller and its three functional zones,
- peripheral navigation,
- one representative project's multi-scene visual sequence.

That composition should be evaluated at desktop and mobile sizes before the
interaction system is expanded. This prevents functional completeness from
being mistaken for a finished design.

## Shape and Icon Grammar

Interaction should be understandable from silhouette, position, and motion
before the visitor reads a label. Text remains useful for precision and
accessibility, but it should not carry the entire burden of explaining the
interface.

Shapes must have consistent behavioral meaning:

- **Circles represent playback and immediate transport.** Previous, pause or
  play, and next-scene controls belong to one family because they operate on
  the current sequence.
- **A line with nodes represents scene position.** The visitor should perceive
  progress and the number of scenes without first parsing `01 / 04`.
- **A vertical capsule represents project movement.** Up and down occupy one
  rocker-shaped control because they move through the project channel rather
  than through the current sequence.
- **A four-cell grid represents overview.** This opens the complete project
  guide and must remain visually distinct from directional navigation.
- **A framed outward arrow represents deeper inspection.** It takes the
  visitor out of the viewing surface and into the full case study.
- **A circular cross represents dismissal.** Closing an overlay should not look
  like another navigation direction.

The control groups should also differ in geometry and placement so that similar
icons cannot be confused:

- playback controls are horizontal and circular,
- project navigation is vertical and capsule-shaped,
- overview is square and grid-based,
- case-study entry is rectangular and directional.

Icons should use a shared stroke weight, optical size, corner treatment, and
level of abstraction. Unicode arrows and text characters should not be used as
finished interface icons because their weight and proportions depend on the
font and operating system.

Labels may remain visible where they provide useful context, but a visitor
should be able to infer the primary interaction model by glancing at the
console. Hover, focus, active, disabled, and selected states must reinforce the
same visual grammar rather than introduce new symbols.

## Chosen Physical Metaphor

The primary viewing interface should use a contemporary abstraction of a
television and remote control.

This choice is based on familiarity rather than thematic similarity. A physical
reference is useful only when a broad audience already understands how it
behaves. More specialized references such as editing consoles, scientific
instruments, or modular systems may resemble the work conceptually, but their
controls are not universally understood.

The television model provides an established interaction vocabulary:

- the framed surface is the screen,
- a project is a channel,
- scenes form the current program,
- transport controls operate within the program,
- `CH+` and `CH-` move between projects,
- Guide opens the complete project collection,
- Info reveals concise project metadata on the screen,
- the full-case action leaves viewing mode and enters the detailed case study.

The skeuomorphism should be structural and behavioral rather than nostalgic.
The design may preserve a bezel, remote-control grouping, rocker controls,
recessed buttons, illuminated states, and screen overlays. It should not imitate
wood grain, antennas, old plastic, or decorative vintage television details.

The intended result is not a website decorated like a television. It is a
modern viewing object whose operation is understood through existing human
experience.

Originality should come from:

- the visual direction of each project program,
- the material and proportions of the screen and controller,
- typography and image sequencing,
- the presentation of technical evidence,
- restrained color and state changes.

The familiar object supplies intuition. The authored project content supplies
identity.

### Channel and Episode Hierarchy

The television metaphor has two distinct navigation levels:

- **Channel equals project.** `CH+` and `CH-` switch between complete projects.
- **Episode equals project chapter.** Previous, play or pause, and next operate
  within the selected project.

Each project initially contains four functional episodes:

1. Overview
2. System architecture
3. Evidence and results
4. Ownership and technology

Changing channel resets the newly selected project to Episode 1. Episode
transport must never switch projects, and channel controls must never advance
an episode. This separation should remain visible in both the control layout
and keyboard behavior.

Episodes are not generic carousel slides. They are chapters in one project's
argument and should eventually receive project-specific art direction. The
four-part structure is a content scaffold, not a requirement that every final
episode use the same visual template.

### Controller Information Economy

The controller should follow Flow TV's topology rather than presenting every
available action as an equal dashboard tile.

The useful control zones are:

- transport controls for the current episode,
- concise episode title and context,
- compact view-mode buttons for Info and Guide,
- one channel card containing project identity and channel movement.

Project identity should not appear as a separate large module in addition to
the channel selector. Info, Guide, and case-study navigation should not become
large commercial-style calls to action. The full case study is represented by
a compact outward action beside episode context.

This keeps the controller focused on viewing state rather than duplicating
information already visible on the screen.
