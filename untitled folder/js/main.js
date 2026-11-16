/**
 * PURVA'S 20TH BIRTHDAY INVITATION — JAVASCRIPT CONTROLLER
 * Full Interactive Envelope, Wax Seal Physics, 2-Second Staggered Reveal,
 * Web Audio API Sound Synthesis, Scroll Triggers & Confetti Engine.
 */

(function () {
  'use strict';

  // --- CONFIGURATION & EVENT DETAILS ---
  const EVENT_CONFIG = {
    title: "Purva's 20th Birthday Party! 🪩🎂",
    details: "Celebrating Poobie turning 20! P.S. Please be on time cuz we have exams 😭",
    venue: "Madras Taproom",
    startDate: "20261117T173000",
    endDate: "20261117T213000",
    targetTimestamp: new Date("2026-11-17T17:30:00+05:30").getTime()
  };

  // --- AUDIO SYNTHESIS ENGINE (Web Audio API) ---
  // Completely standalone: zero external audio files, works offline, muted by default
  let audioCtx = null;
  let isSoundEnabled = false;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Sound: Wax Seal Crack Snap
  function playWaxCrackSound() {
    if (!isSoundEnabled || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      
      // Noise burst for the physical fracture crunch
      const bufferSize = audioCtx.sampleRate * 0.12;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }
      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, now);
      filter.Q.setValueAtTime(2.5, now);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.7, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      noise.start(now);

      // Low thump
      const osc = audioCtx.createOscillator();
      const oscGain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);
      oscGain.gain.setValueAtTime(0.5, now);
      oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

      osc.connect(oscGain);
      oscGain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  // Sound: Paper Rustle / Envelope Slide
  function playPaperSlideSound() {
    if (!isSoundEnabled || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const bufferSize = audioCtx.sampleRate * 0.35;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
      }
      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.frequency.linearRampToValueAtTime(400, now + 0.35);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      noise.start(now);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  // Sound: Sparkle Chimes
  function playSparkleChimes() {
    if (!isSoundEnabled || !audioCtx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
      const now = audioCtx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.45);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.5);
      });
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  // Sound: Celebratory Fanfare
  function playCelebrationFanfare() {
    if (!isSoundEnabled || !audioCtx) return;
    try {
      const melody = [
        { f: 523.25, d: 0.12 }, // C5
        { f: 659.25, d: 0.12 }, // E5
        { f: 783.99, d: 0.12 }, // G5
        { f: 1046.50, d: 0.35 } // C6
      ];
      const now = audioCtx.currentTime;
      let offset = 0;
      melody.forEach(item => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.f, now + offset);

        gain.gain.setValueAtTime(0.25, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.01, now + offset + item.d);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + item.d + 0.05);
        offset += item.d * 0.85;
      });
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }


  // --- DOM ELEMENTS ---
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  const soundText = document.getElementById('soundText');

  const envelopeStage = document.getElementById('envelopeStage');
  const envelopeCard = document.getElementById('envelopeCard');
  const waxSealBtn = document.getElementById('waxSealBtn');
  const waxCracks = document.getElementById('waxCracks');
  const envelopeLetter = document.getElementById('envelopeLetter');

  const invitationMain = document.getElementById('invitationMain');
  const posterContainer = document.getElementById('posterContainer');
  const scrollCue = document.getElementById('scrollCue');

  const rsvpConfirmBtn = document.getElementById('rsvpConfirmBtn');
  const rsvpSuccessBox = document.getElementById('rsvpSuccessBox');
  const addToCalBtn = document.getElementById('addToCalBtn');
  const downloadIcsBtn = document.getElementById('downloadIcsBtn');
  const replayBtn = document.getElementById('replayBtn');

  const cdDays = document.getElementById('cdDays');
  const cdHours = document.getElementById('cdHours');
  const cdMins = document.getElementById('cdMins');
  const cdSecs = document.getElementById('cdSecs');

  const confettiCanvas = document.getElementById('confettiCanvas');
  const ambientStars = document.getElementById('ambientStars');


  // --- AMBIENT STARS & PASTEL PARTICLES GENERATOR ---
  function populateAmbientStars() {
    if (!ambientStars) return;
    const symbols = ['✦', '✧', '★', '♡', '⋆'];
    const count = window.innerWidth < 600 ? 18 : 34;

    for (let i = 0; i < count; i++) {
      const star = document.createElement('span');
      star.className = 'ambient-star';
      star.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      star.style.left = `${Math.random() * 98}%`;
      star.style.top = `${Math.random() * 98}%`;
      star.style.fontSize = `${0.65 + Math.random() * 0.85}rem`;
      star.style.setProperty('--dur', `${2.5 + Math.random() * 3.5}s`);
      star.style.setProperty('--delay', `${Math.random() * 3}s`);
      ambientStars.appendChild(star);
    }
  }


  // --- AUDIO TOGGLE HANDLER ---
  function toggleSound() {
    initAudioContext();
    isSoundEnabled = !isSoundEnabled;
    if (isSoundEnabled) {
      soundToggleBtn.classList.add('sound-active');
      soundIcon.textContent = '🔊';
      soundText.textContent = 'Sound: On';
      playSparkleChimes();
    } else {
      soundToggleBtn.classList.remove('sound-active');
      soundIcon.textContent = '🔇';
      soundText.textContent = 'Sound: Off';
    }
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', toggleSound);
  }


  // --- WAX SEAL BREAK & ENVELOPE OPENING INTERACTION ---
  let isEnvelopeOpened = false;

  function openEnvelopeSequence() {
    if (isEnvelopeOpened) return;
    isEnvelopeOpened = true;
    initAudioContext();

    // 1. Wax seal cracks with satisfying animation & sound
    waxSealBtn.classList.add('breaking');
    playWaxCrackSound();

    setTimeout(() => {
      waxSealBtn.classList.add('broken');
      
      // 2. Envelope flap slowly flips open with 3D perspective
      setTimeout(() => {
        envelopeCard.classList.add('opening');
        playPaperSlideSound();

        // 3. Letter slides up out of envelope pocket
        setTimeout(() => {
          envelopeCard.classList.add('letter-sliding');
          
          // 4. Letter unfolds smoothly
          setTimeout(() => {
            envelopeCard.classList.add('letter-unfolding');
            playSparkleChimes();

            // 5. Transition to Full Birthday Poster Main View & trigger 2-sec Grand Reveal!
            setTimeout(() => {
              transitionToPosterReveal();
            }, 750);

          }, 450);

        }, 500);

      }, 350);

    }, 200);
  }

  if (waxSealBtn) {
    waxSealBtn.addEventListener('click', openEnvelopeSequence);
  }


  // --- THE GRAND REVEAL: 2-SECOND STAGGERED ANIMATION ---
  function transitionToPosterReveal() {
    // Fade out sealed envelope stage
    envelopeStage.classList.add('completed');
    
    // Reveal main poster container
    invitationMain.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Restart all poster animations cleanly
    triggerPosterAssemblyAnimation();
  }

  function triggerPosterAssemblyAnimation() {
    // Remove and re-add animation classes to trigger fresh 2.0s synchronized reveal
    const animatedElements = posterContainer.querySelectorAll('.poster-element');
    animatedElements.forEach(el => {
      el.style.animation = 'none';
      el.offsetHeight; /* force reflow */
      el.style.animation = '';
    });

    // Scrapbook individual letters staggered pop
    const scrapLetters = posterContainer.querySelectorAll('.scrap-letter');
    scrapLetters.forEach(letter => {
      letter.style.animation = 'none';
      letter.offsetHeight; /* force reflow */
      letter.style.animation = '';
    });

    // Sound accents during the 2-second assembly (if unmuted)
    if (isSoundEnabled) {
      setTimeout(() => playSparkleChimes(), 300);
      setTimeout(() => playPaperSlideSound(), 900);
      setTimeout(() => playSparkleChimes(), 1500);
    }
  }


  // --- SCROLL-TRIGGERED OBSERVER (Sections 5, 6, 7, 8) ---
  function initScrollObserver() {
    const targets = document.querySelectorAll('.reveal-on-scroll');
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      });

      targets.forEach(target => observer.observe(target));
    } else {
      // Fallback
      targets.forEach(target => target.classList.add('revealed'));
    }
  }

  // Smooth scroll down when tapping scroll cue
  if (scrollCue) {
    scrollCue.addEventListener('click', () => {
      const dramaticSection = document.getElementById('dramaticSection');
      if (dramaticSection) {
        dramaticSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }


  // --- COUNTDOWN TIMER TO NOV 17, 2026 5:30 PM ---
  function updateCountdown() {
    if (!cdDays) return;
    const now = Date.now();
    const diff = EVENT_CONFIG.targetTimestamp - now;

    if (diff <= 0) {
      cdDays.textContent = "00";
      cdHours.textContent = "00";
      cdMins.textContent = "00";
      cdSecs.textContent = "00";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    cdDays.textContent = String(days).padStart(2, '0');
    cdHours.textContent = String(hours).padStart(2, '0');
    cdMins.textContent = String(mins).padStart(2, '0');
    cdSecs.textContent = String(secs).padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();


  // --- CONFETTI CANNON ENGINE ---
  let confettiAnimationId = null;
  let particles = [];

  function launchConfettiCelebration() {
    if (!confettiCanvas) return;
    const ctx = confettiCanvas.getContext('2d');
    const width = confettiCanvas.width = window.innerWidth;
    const height = confettiCanvas.height = window.innerHeight;

    particles = [];
    const colors = ['#E63973', '#FF6699', '#F9D0DC', '#FFC043', '#FFFFFF', '#D2D2D7', '#9E1840'];
    const totalParticles = window.innerWidth < 600 ? 90 : 160;

    for (let i = 0; i < totalParticles; i++) {
      particles.push({
        x: width * 0.5 + (Math.random() * 80 - 40),
        y: height * 0.65,
        vx: (Math.random() - 0.5) * 16,
        vy: -Math.random() * 18 - 8,
        size: Math.random() * 9 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        isHeart: Math.random() > 0.75,
        gravity: 0.38,
        friction: 0.985,
        opacity: 1
      });
    }

    function renderConfetti() {
      ctx.clearRect(0, 0, width, height);

      let activeCount = 0;
      particles.forEach(p => {
        p.vx *= p.friction;
        p.vy = (p.vy + p.gravity) * p.friction;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.007;

        if (p.opacity > 0 && p.y < height + 40) {
          activeCount++;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillStyle = p.color;

          if (p.isHeart) {
            // Draw cute heart
            ctx.font = `${p.size * 1.5}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('♡', 0, 0);
          } else {
            // Draw rectangle / streamer
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.3);
          }
          ctx.restore();
        }
      });

      if (activeCount > 0) {
        confettiAnimationId = requestAnimationFrame(renderConfetti);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    }

    if (confettiAnimationId) cancelAnimationFrame(confettiAnimationId);
    renderConfetti();
  }

  window.addEventListener('resize', () => {
    if (confettiCanvas) {
      confettiCanvas.width = window.innerWidth;
      confettiCanvas.height = window.innerHeight;
    }
  });


  // --- RSVP CONFIRMATION BUTTON HANDLER ---
  if (rsvpConfirmBtn) {
    rsvpConfirmBtn.addEventListener('click', () => {
      initAudioContext();
      playCelebrationFanfare();
      launchConfettiCelebration();

      // Show celebration card
      if (rsvpSuccessBox) {
        rsvpSuccessBox.classList.remove('hidden');
        rsvpSuccessBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Button feedback
      rsvpConfirmBtn.style.transform = 'scale(0.96)';
      setTimeout(() => {
        rsvpConfirmBtn.style.transform = '';
        rsvpConfirmBtn.innerHTML = '<span>🎉 You’re Officially On The List! ♡</span>';
        rsvpConfirmBtn.style.background = '#2E7D32';
      }, 200);
    });
  }


  // --- ADD TO GOOGLE CALENDAR ---
  if (addToCalBtn) {
    addToCalBtn.addEventListener('click', () => {
      const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(EVENT_CONFIG.title)}&dates=${EVENT_CONFIG.startDate}/${EVENT_CONFIG.endDate}&details=${encodeURIComponent(EVENT_CONFIG.details)}&location=${encodeURIComponent(EVENT_CONFIG.venue)}`;
      window.open(gcalUrl, '_blank');
    });
  }


  // --- DOWNLOAD ICAL (.ICS) FILE ---
  if (downloadIcsBtn) {
    downloadIcsBtn.addEventListener('click', () => {
      const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Poobie Birthday 2026//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        `SUMMARY:${EVENT_CONFIG.title}`,
        `DESCRIPTION:${EVENT_CONFIG.details}`,
        `LOCATION:${EVENT_CONFIG.venue}`,
        `DTSTART:${EVENT_CONFIG.startDate}`,
        `DTEND:${EVENT_CONFIG.endDate}`,
        "STATUS:CONFIRMED",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', "Purva-20th-Birthday.ics");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }


  // --- REPLAY EXPERIENCE HANDLER ---
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      isEnvelopeOpened = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });

      setTimeout(() => {
        // Reset envelope states
        envelopeCard.classList.remove('opening', 'letter-sliding', 'letter-unfolding');
        waxSealBtn.classList.remove('breaking', 'broken');
        if (waxCracks) waxCracks.style.opacity = '0';

        // Hide main poster & show envelope stage
        invitationMain.classList.add('hidden');
        envelopeStage.classList.remove('completed');
      }, 400);
    });
  }


  // --- INITIALIZATION ON LOAD ---
  window.addEventListener('DOMContentLoaded', () => {
    populateAmbientStars();
    initScrollObserver();
    document.body.classList.remove('initial-load');
  });

})();
