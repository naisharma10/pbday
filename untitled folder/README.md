# ✨ Purva (Poobie) is Turning 20! — Birthday Invitation Website

An interactive, nostalgic, playful, and aesthetic birthday invitation website created for **Purva (Poobie)**'s 20th birthday party at **Madras Taproom** on **November 17th, 2026 at 5:30 PM**.

Recreated faithfully from her vintage scrapbook birthday poster with rich animations, physical paper textures, interactive 3D envelope opening, custom Web Audio sound effects, and RSVP integration.

---

## 🌟 Interactive Experience Walkthrough

1. **The Sealed Letter**:
   - Vintage ivory paper textured background.
   - Soft blush pink vintage envelope centered on the screen.
   - Realistic crimson-pink wax seal with an embossed heart and initial **P**.
   - Breathing ambient sparkles and gentle glowing pulse.
   - *"Someone has a very important invitation for you… Tap to open ♡"*

2. **Interactive Wax Seal Break**:
   - Tapping the wax seal triggers an organic crack effect with synthesized acoustic crunch.
   - Envelope flap unfolds in 3D perspective (`rotateX(180deg)`).
   - Folded letter slides upward from the pocket and unfolds smoothly.

3. **The Grand Reveal (2-Second Staggered Assembly)**:
   - **0.0–0.3s**: Cream background, top party bunting pennants & top-left pink disco ball appear.
   - **0.3–0.6s**: Childhood photograph of Purva with retro sunglasses slides into the center, pink birthday hat pops onto her head, and glitter stars appear.
   - **0.6–0.9s**: Metallic pink balloons float into the top right, disco balls animate into the corners, and glittery stars twinkle into position.
   - **0.9–1.2s**: Giant metallic pink balloon **"20"** bounces in, and the birthday cupcake with a flickering warm candle flame appears.
   - **1.2–1.5s**: **"BIRTHDAY PARTY"** cut-out scrapbook lettering pops letter-by-letter in vibrant paper scraps.
   - **1.5–1.8s**: **"for Purva (Poobie)"** flows in cursive typography with pink hearts and a hand-drawn underline.
   - **1.8–2.0s**: Event details bar (Date: Nov 17th 2026, Time: 5:30 pm, Venue: Madras Taproom), pink satin ribbon bow, and taped memo settle into place.

4. **The Dramatic Scroll Experience**:
   - Huge bold typography: **"SAYING NO ISN’T AN OPTION."**
   - *"You’re not busy. You’re not tired. You don’t have other plans. You’re coming. End of discussion."*
   - Scrapbook stickers, washi tape, lipstick kiss marks, and bows.

5. **A Personal Message**:
   - **"IT’S A BIG DEAL. SHE’S TURNING 20."**
   - *"Twenty years of being iconic, dramatic, adorable and occasionally impossible..."*

6. **The Important Reminder**:
   - Real taped pink paper note with an animated fluttering ribbon bow on top:
   - **"P.S. PLEASE BE ON TIME. Cuz we have exams 😭"**

7. **RSVP & Confirmation Checkpoint**:
   - **"SO… WE’RE SEEING YOU THERE, RIGHT? Don’t make us come looking for you."**
   - Live Countdown timer to November 17, 2026 at 5:30 PM.
   - Interactive button: **"I’m Obviously Coming ♡"**
   - Triggers celebratory confetti cannon and reveals **"THAT’S WHAT WE LIKE TO HEAR!"**
   - One-click **WhatsApp RSVP** with prefilled message.
   - **Add to Google Calendar** and **Download Apple / iCal (.ics)** buttons.
   - Venue link to Madras Taproom.
   - **Replay Invitation Opening** button.

---

## 🚀 How to Run Locally

A local HTTP server is already running! Simply open:
```
http://localhost:8080
```
in any web browser (Chrome, Safari, Edge, Firefox, or on your phone).

---

## 🌐 Free Hosting & Sharing Guide (Step-by-Step)

You can deploy this site in **under 2 minutes** completely for free:

### Option 1: Netlify Drop (Fastest — 30 seconds, no terminal needed)
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the folder containing these files (`index.html`, `css/`, `js/`, `assets/`) into the browser.
3. Netlify will instantly provide a public link (e.g., `https://poobie-turns-20.netlify.app`) that you can copy and send on WhatsApp or Instagram!

### Option 2: Vercel (Recommended for custom domain)
1. Go to [https://vercel.com](https://vercel.com).
2. Click **Add New Project** -> **Deploy Existing Folder** or install the Vercel CLI:
   ```bash
   npx vercel
   ```
3. Follow the 2 prompts (Accept defaults). Your site is live with a free `.vercel.app` URL.

### Option 3: GitHub Pages
1. Push this folder to a GitHub repository (e.g. `poobie-20th-birthday`).
2. Go to repository **Settings** -> **Pages**.
3. Under **Build and deployment**, select source: **Deploy from a branch** -> branch: `main` / `root` -> **Save**.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.
