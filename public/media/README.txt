PUT YOUR CLIENT PHOTOS & VIDEOS HERE
====================================

Anything placed in this folder (/public/media/) is served from the site root.

Example: a file saved here as  before-after.jpg  is available in code as  /media/before-after.jpg

WHERE TO USE THEM
-----------------
1. WhyUs section  -> src/components/WhyUs.jsx
   Find the "MEDIA SLOT" comment and replace the <div className="placeholder">...</div>
   with ONE of:
     <img src="/media/your-photo.jpg" alt="Our team at work" />
     <video src="/media/your-video.mp4" autoPlay muted loop playsInline />

2. Hero background video (optional)
   You can add a looping video behind the 3D scene if preferred.

RECOMMENDED
-----------
- Images: JPG/WebP, ~1200px wide, under ~400KB each
- Video:  MP4 (H.264), muted, short loop (5-15s), under ~5MB for fast loading
