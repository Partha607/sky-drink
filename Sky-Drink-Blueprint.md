# **AI SYSTEM DIRECTIVE: SKY DRINK WEB APPLICATION BUILD**

## **1\. PROJECT OVERVIEW & BRAND IDENTITY**

**Brand Name:** Sky Drink  
**Origin:** Guwahati, Assam, India.  
**Tagline:** "Work Hard. No Excuses."  
**Target Audience:** Gen-Z and Gen-Alpha.  
**Vibe/Aesthetic:** Aggressive, hyper-energetic, streetwear/hypebeast styling, dark mode default (Deep Zinc/Black), high contrast neon accents (Yellow, Orange, Green, Pink).  
**Mobile-First UX:** The target demographic consumes content almost exclusively on mobile. Mobile optimization is the primary development constraint. All layouts must prioritize fluid touch interactions, appropriately sized touch targets, and vertical stacking.  
**Architecture Constraint:** PURE STATIC SITE. No database, no headless CMS. All data must be hardcoded JSON/arrays within the components.

## **2\. TECH STACK SPECIFICATION**

* **Framework:** Astro (Static Site Generation mode)  
* **UI Components:** React (rendered as Astro Islands client:load for interactivity)  
* **Styling:** Tailwind CSS (utility-first, emphasizing responsive prefixes sm:, md:, lg:)  
* **Animations:** GSAP (ScrollTrigger) & Native CSS Keyframes  
* **Icons:** Lucide React

## **3\. ASSET INVENTORY**

Place the following files in the src/assets/ directory. All images must be optimized using Astro's native \<Image /\> component.

1. Sky-Drink-promo.mp4 (Hero background video)  
2. mango-fizz.jpg (Flavor showcase)  
3. lychee-fizz.jpg (Flavor showcase)  
4. spice-vibe.jpg (Flavor showcase)  
5. tagline.jpg (Price showcase)  
6. Northeast-flavour.jpg (Roots map)

## **4\. EXECUTION PHASES & TASK LIST**

### **PHASE 1: SCAFFOLDING & GLOBAL SETUP**

**Task 1.1: Initialize Project**

* Create a new Astro project.  
* Add React and Tailwind CSS integrations.  
* Configure tailwind.config.mjs to include custom neon colors and a custom fontFamily (sans-serif, bold, geometric like 'Inter' or 'Oswald').

**Task 1.2: Global CSS (src/styles/global.css)**

* Set body to bg-zinc-950 text-white overflow-x-hidden.  
* Apply custom scrollbar styling (hidden or minimal).  
* Set cursor: none for desktop viewports (we will use a custom React cursor).  
* Define CSS @keyframes for the infinite marquee.  
* Ensure touch-action is manipulated appropriately to prevent unwanted zoom/pan on interactive elements.

### **PHASE 2: GLOBAL MICRO-INTERACTIONS (React Islands)**

**Task 2.1: The "Fizz" Custom Cursor (CustomCursor.jsx)**

* Build a fixed, pointer-events-none div that tracks window.addEventListener('mousemove').  
* Default state: Small white dot.  
* Hover state: When hovering over a, button, or .clickable classes, expand the dot and add a trailing neon yellow/orange aura (blur effect).  
* **Mobile Constraint:** Disable entirely on viewports \< 768px. Fall back to native touch interactions.

**Task 2.2: Kinetic Energy Scroll Bar (EnergyBar.jsx)**

* Build a fixed vertical progress bar attached to the right edge of the screen (w-1 md:w-3). Keep it ultra-thin on mobile to save screen real estate.  
* Track vertical scroll progress (window.scrollY / document height).  
* As scroll increases, fill the bar from bottom to top with a glowing yellow bg-yellow-400.  
* **Trigger:** When scroll hits \> 98%, change color to bg-red-500, apply animate-pulse, and reveal sideways text reading "MAX ENERGY" (hide text on mobile).

**Task 2.3: Sticky Glassmorphism Nav (Navbar.jsx)**

* Transparent on load.  
* On scroll \> 50px, transition to bg-zinc-950/90 backdrop-blur-md with a subtle yellow shadow.  
* **Mobile Constraint:** Include a high-contrast hamburger menu toggle. The mobile menu must open a full-screen (h-screen) dark overlay with large, touch-friendly navigation links (minimum p-4 padding for each link).

### **PHASE 3: CORE LANDING PAGE SECTIONS**

**Task 3.1: The Hero Showcase (Hero.astro)**

* **Mobile Constraint:** Layout must stack vertically on mobile (flex-col), and side-by-side on desktop (md:flex-row).  
* Typography: Massive, stacked text "WORK HARD. NO EXCUSES." Use bg-clip-text with gradients. Adjust text-5xl for mobile, md:text-8xl for desktop.  
* Video pod: Use Sky-Drink-promo.mp4. Wrap it in a rounded container (rounded-\[2rem\]) with a dark gradient overlay. Ensure width is w-full max-w-sm so it fits on small phone screens.

**Task 3.2: Hypebeast Marquee (Marquee.astro)**

* Full-width banner, bg-yellow-400 text-black.  
* Text: "WORK HARD. NO EXCUSES. ⚡ ONLY ₹20 ⚡ GUWAHATI PRIDE ⚡ FUEL YOUR HUSTLE"  
* Use CSS animation to scroll infinitely. Pause on hover (desktop only).

**Task 3.3: The Flavors Grid (Flavors.astro)**

* **Mobile Constraint:** Grid layout must be grid-cols-1 on mobile, shifting to lg:grid-cols-3 on desktop.  
* Use mango-fizz.jpg, lychee-fizz.jpg, and spice-vibe.jpg.  
* Hover effect: Scale image scale-110, darken overlay, slide up text descriptions. *Note: On mobile, ensure text descriptions are always partially visible or appear on tap, since hover doesn't exist on touch screens.*

**Task 3.4: Price Hook Section (PriceTag.astro)**

* **Mobile Constraint:** 1-column stack on mobile, 2-column layout on desktop (md:grid-cols-2).  
* Left: Display tagline.jpg. Tilt it slightly (rotate-\[-2deg\]).  
* Right: Large typography "UNBEATABLE ENERGY. UNBEATABLE PRICE." Emphasize the ₹20 price point. Add stat cards (Instant Energy, Laser Focus) with large touch targets.

### **PHASE 4: INTERACTIVE COMPONENTS (React Islands)**

**Task 4.1: The Northeast Roots Map (RootsMap.jsx)**

* Hardcode a JSON array of the 8 Northeast states containing: name, vibe, lore, and colorClass.  
* **Mobile Constraint:** Instead of a vertical list that forces too much scrolling on phones, make the state selection a horizontal swipeable row on mobile (flex-row overflow-x-auto snap-x), and a vertical list on desktop (lg:flex-col).  
* Right side default image: Northeast-flavour.jpg (dimmed).  
* Interaction: Tapping/hovering a state updates the display with specific lore and changes the ambient background glows.

**Task 4.2: The "Vibe Check" Quiz (VibeCheck.jsx)**

* Create a highly stylized, arcade-like quiz UI component.  
* **Mobile Constraint:** Ensure answer buttons are large and stack vertically (flex-col gap-4) for easy thumb tapping.  
* **Data:** Hardcode 3 questions (e.g., "What's your 3 AM vibe?", "Choose your aesthetic", "What's your ultimate goal?").  
* **Logic:** Assign point values to answers mapping to Mango, Lychee, or Spice. Calculate the result on the final screen.  
* **Reward/Canvas:** Upon calculating the result, use HTML5 \<canvas\> API to generate a digital "Hustler ID".  
  * Draw a branded background.  
  * Overlay the user's matched flavor name, random ID number, and "10% OFF PROMO: SKYHUSTLE".  
  * Provide a "Download ID" button that triggers a download of the canvas as a .png.

### **PHASE 5: ANIMATION & POLISH**

**Task 5.1: GSAP ScrollTrigger Integration**

* Wrap major sections in Astro components.  
* Use a global script to initialize GSAP ScrollTrigger.  
* Add fade-up and slight scale-up animations. Ensure matchMedia is used in GSAP to tone down complex animations on mobile devices to save battery and maintain 60 FPS.

**Task 5.2: Final Mobile & Touch Audit**

* **Touch Targets:** Ensure all interactive buttons/links have a minimum touch target size of 44x44px.  
* **Overflow:** Verify horizontal overflow is strictly hidden (overflow-x-hidden on the main wrapper) to prevent mobile 'wobble' while scrolling.  
* Run astro build to verify the static generation compiles without errors.