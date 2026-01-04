# 🧪 Qodha Maps - Testing & Troubleshooting Guide

## ✅ Quick Testing Checklist

### 1. Initial Load Test
- [ ] Page loads without errors (F12 → Console)
- [ ] Map displays correctly
- [ ] Sidebar loads with data
- [ ] No console errors/warnings
- [ ] Loading spinner appears briefly then disappears

**Expected Result:** 
- Mitra list appears in sidebar
- Map shows markers for all mitra
- Statistics show correct counts

---

### 2. Search Functionality Test
```
Test Case 1: Search by name
Input: "Toko" (atau nama toko yang ada)
Result: Sidebar filters to matching stores
        Map markers update to show only matches

Test Case 2: Search by address
Input: "Jakarta" (atau kota yang ada)
Result: Filters by location

Test Case 3: Search by city
Input: Nama kota di database
Result: Shows all stores in that city

Test Case 4: Clear search
Input: Delete text
Result: All stores appear again
```

**Common Issue:** 
- Search case-sensitive? → No, it's lowercase checked
- Empty results correct? → Yes, should show "Tidak ada mitra"

---

### 3. Filter Tabs Test
```
Test: Click "Buka" tab
Result: Shows only active stores (status_aktif = '1')
        Counter updates correctly

Test: Click "Tutup" tab
Result: Shows only closed stores
        Counter updates correctly

Test: Click "Semua" tab
Result: Shows all stores again
```

**Common Issue:**
- Filter not persisting when search changes? → Try again, should be combined
- Counts not updating? → Check browser cache, hard refresh (Ctrl+Shift+R)

---

### 4. Marker Interaction Test
```
Test 1: Click on map marker
Result: 
  - Marker scales up & glows
  - Popup appears with store info
  - Sidebar scrolls to matching item
  - Item highlights with ring & bg color

Test 2: Click on sidebar item
Result:
  - Map flies to location (smooth animation)
  - Marker highlights
  - Popup opens
  - On mobile: sidebar closes automatically

Test 3: Click close button on popup
Result:
  - Popup disappears
  - Marker animation remains (stays highlighted until you click elsewhere)
```

**Expected Behavior:**
- Marker scale: 1.25x larger
- Animation duration: ~300ms
- Map fly duration: ~1.2 seconds

---

### 5. Geolocation Test
```
Test: Click "Disekitar Saya" button
Expected:
  - Browser asks for location permission
  - If allowed: Blue circle appears at your location
  - Map flies to your location at zoom 15
  - "📍 Lokasi Anda" popup appears

Test: If geolocation denied
Result: Alert shows "Gagal mendeteksi lokasi"
```

**Note:** 
- Only works on HTTPS or localhost
- Need GPS enabled on mobile
- First time will ask permission

---

### 6. Statistics Panel Test
```
Test: Click "Statistik" button
Result:
  - Detail panel appears (right side on desktop, bottom sheet on mobile)
  - Shows three stat cards: Total, Buka, Tutup
  - Shows city ranking (top 5 cities by mitra count)
  - Numbers match sidebar stats

Test: Apply filter, then check stats
Result:
  - Stats update to match filter
  - For example: Click "Buka" tab → stats only count active stores
```

---

### 7. Responsive Design Test

#### Mobile View (375px width)
```
Visual checks:
- [ ] Sidebar hidden by default (hamburger menu visible)
- [ ] Hamburger button functional
- [ ] All buttons readable and tappable
- [ ] Search input full width
- [ ] Stats visible (3 columns)
- [ ] Detail panel as bottom sheet (not side panel)
- [ ] Map takes full remaining space
```

#### Tablet View (768px width)
```
Visual checks:
- [ ] Sidebar visible on left side
- [ ] Detail panel on right side (if opened)
- [ ] Hamburger menu hidden
- [ ] Proportional spacing
```

#### Desktop View (1920px width)
```
Visual checks:
- [ ] Sidebar at full width (420px)
- [ ] Map takes remaining space
- [ ] Detail panel side panel (right side)
- [ ] All elements properly sized
```

**Test Method:**
```
1. Open DevTools (F12)
2. Click "Toggle device toolbar" (Ctrl+Shift+M)
3. Test different device presets
4. Manually resize window to check
```

---

### 8. Color & Typography Test
```
Visual checks:
- [ ] Emerald green (#10b981) used for primary actions
- [ ] Sky blue used for secondary actions
- [ ] Active badges: Green background
- [ ] Closed badges: Red background
- [ ] Text is readable (sufficient contrast)
- [ ] Font sizes look proportional
- [ ] Headlines use Plus Jakarta Sans (bolder look)
- [ ] Body text uses Inter (cleaner look)
```

---

### 9. Animation Test
```
Test: Hover over sidebar cards
Result: Card lifts up slightly (2px translate) ✨

Test: Hover over buttons
Result: Color changes smoothly

Test: Click marker
Result: Marker bounces/scales up smoothly (not jerky)

Test: Geolocation button
Result: Initial spin animation

Test: Open search focus
Result: Input ring highlights smoothly
```

**Performance Check:**
```
F12 → Performance tab
1. Click marker
2. Record for 2 seconds
3. Check for smooth 60fps (no red/orange bars)
```

---

## 🐛 Common Issues & Solutions

### Issue 1: Markers not showing on map
```
Symptoms: Map is empty, no markers visible
Cause: API not returning data

Fix:
1. Check api/map_data.php is accessible
2. Open browser console (F12)
3. Look for error messages
4. Check database connection in config/database.php
5. Make sure marker image exists: assets/img/marker_qodha.png
```

**Test API directly:**
```
Visit: http://localhost/gis_mitraqodha/api/map_data.php
Should see JSON with mitra data
```

---

### Issue 2: Search not working
```
Symptoms: Typing doesn't filter results

Fix:
1. Check browser console for JS errors
2. Verify all mitra have 'nama' property
3. Try clearing filter tabs first
4. Hard refresh (Ctrl+Shift+R)
```

---

### Issue 3: Map doesn't fly to location when clicking
```
Symptoms: Click marker but map doesn't move

Fix:
1. Check JavaScript console for errors
2. Verify marker has valid lat/lng coordinates
3. Check Leaflet.js is loaded (no red X in console)
4. Try clicking a different marker
5. Refresh page and try again
```

---

### Issue 4: Sidebar doesn't close on mobile after clicking
```
Symptoms: Mobile sidebar stays open after item click

Fix:
1. Check if window width is correctly detected
2. Verify toggleSidebar() is being called
3. Test on actual mobile device (not just devtools)
4. Check for JavaScript errors in console
```

---

### Issue 5: Popup showing wrong information
```
Symptoms: Marker shows info from different store

Fix:
1. Check that all mitra have unique properties
2. Verify database has correct data
3. Hard refresh to clear old cache
4. Check if popupContent template has typos
```

---

### Issue 6: Mobile styling looks broken
```
Symptoms: Buttons too small, text overlapping, etc.

Fix:
1. Check viewport meta tag exists (should be in <head>)
2. Hard refresh (Ctrl+Shift+R)
3. Check Tailwind CSS is loaded (should see no flash of unstyled content)
4. Test on actual device, not just emulation
5. Check for CSS errors in console
```

---

### Issue 7: Statistics showing wrong numbers
```
Symptoms: Total/Buka/Tutup counts incorrect

Fix:
1. Check all mitra have 'status_aktif' property
2. Verify status_aktif is either '1' or something else
3. Clear filters and refresh
4. Check browser console for calculation errors
```

---

### Issue 8: Geolocation not working
```
Symptoms: "Gagal mendeteksi lokasi" or nothing happens

Fix:
1. Check browser asks for location permission
2. Make sure GPS is enabled on mobile
3. Test only on https:// or localhost (not on IP address)
4. Try in incognito mode (fresh permissions)
5. Check browser location permissions (Settings)
```

---

## 🔍 Browser DevTools Tips

### Console Debugging
```javascript
// Check if data loaded
console.log(allMitraData)

// Check current filter
console.log(currentFilter)

// Check active marker
console.log(currentActiveMarker)

// Manually trigger filter
filterByStatus('active')

// Manually render mitra
renderMitra(allMitraData)
```

### Network Debugging
```
F12 → Network tab
1. Reload page
2. Look for "map_data.php" request
3. Check Status is 200 (success)
4. Click it, go to "Response" tab
5. Verify JSON structure is correct
```

### Performance Debugging
```
F12 → Performance tab
1. Click red circle to start recording
2. Do action (click marker, search, etc)
3. Click red circle again to stop
4. Look for:
   - No red (long running tasks)
   - Smooth frame rate (green)
   - Task completion < 100ms
```

---

## 📝 Test Report Template

```
Date: _______________
Tester: ______________
Browser: Chrome / Firefox / Safari
Device: Desktop / Mobile / Tablet

✅ = Pass
⚠️ = Warning/Issue
❌ = Fail

FUNCTIONALITY TESTS
[ ] Search works correctly
[ ] Filters work correctly
[ ] Marker click highlights marker and item
[ ] Sidebar item click moves map and highlights
[ ] Geolocation shows your location
[ ] Statistics display correct numbers
[ ] All buttons are clickable

VISUAL TESTS
[ ] Colors are correct (emerald, blue)
[ ] Typography looks good
[ ] Spacing is consistent
[ ] Icons display correctly
[ ] Layout responsive and readable
[ ] No overlapping elements
[ ] No broken image references

PERFORMANCE TESTS
[ ] Page loads in < 3 seconds
[ ] Marker click responds instantly
[ ] Search is responsive (< 100ms)
[ ] No jank when scrolling sidebar
[ ] Smooth animations (60fps)

MOBILE TESTS (375px)
[ ] Sidebar toggle works
[ ] All buttons are tappable
[ ] Text is readable
[ ] Detail panel shows as bottom sheet

ISSUES FOUND
1. [Issue]: ___________
   [Severity]: High / Medium / Low
   [Steps to reproduce]: ...
   
NOTES
_________________________

Overall Assessment: 🟢 Ready / 🟡 Needs fix / 🔴 Major issues
```

---

## 🚀 Pre-Deployment Checklist

### Code Quality
- [ ] No console.errors or warnings
- [ ] No 404s in Network tab
- [ ] JavaScript minified (production)
- [ ] CSS minified (production)
- [ ] No hardcoded URLs (use relative paths)

### Performance
- [ ] Lighthouse score ≥ 80
- [ ] Page load time < 3s
- [ ] First Contentful Paint < 1.5s
- [ ] Interaction to Paint < 100ms

### Functionality
- [ ] All features tested
- [ ] All edge cases handled
- [ ] Error messages clear
- [ ] No missing data

### Cross-Browser
- [ ] Chrome/Edge ✅
- [ ] Firefox ✅
- [ ] Safari ✅
- [ ] Mobile Chrome ✅

### Accessibility
- [ ] Tab navigation works
- [ ] Color contrast is sufficient
- [ ] Alt text on images
- [ ] Form labels present

### Security
- [ ] No SQL injection possible
- [ ] No XSS vulnerabilities
- [ ] Sensitive data not exposed
- [ ] HTTPS enabled (if production)

---

## 📞 When Something's Wrong

**Step 1: Check the Console**
```
Press F12 → Console tab
Look for red errors/warnings
Copy the error message
```

**Step 2: Hard Refresh**
```
Ctrl + Shift + R (or Cmd + Shift + R on Mac)
This clears cache and reloads fresh
```

**Step 3: Check Database**
```
Visit: cek.php in your browser
Should say "✅ ALHAMDULILLAH KONEKSI SUKSES!"
If not, check database.php credentials
```

**Step 4: Check API**
```
Visit: api/map_data.php
Should return JSON with mitra data
If error, check api file and database
```

**Step 5: Isolate the Issue**
```
- Test in different browser
- Test on different device
- Try incognito mode (fresh cache)
- Test with sample data
```

---

**Happy Testing! 🎉**

If you find a bug, document it and share the error from console.
The more details, the easier to fix!
