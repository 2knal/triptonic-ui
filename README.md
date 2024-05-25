# triptonic-ui

### Setup

- Git clone repo
- cd into the repo
- npm install
- npm start
(Ensure Expo go app is installed on your phone to check for testing mobile app)
- Have a .env ready in src/ directory with below content
EXPO_PUBLIC_API_URL=<FLASK_REST_API_URL>
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=<GOOGLE_MAPS_API_KEY>


---

### TODO

- [x] HD Splash screen with animations (Export png from figma designs)
- [x] Decide upon logo using lottie animations
- [x] Adjust font-weight for rethink font (download different weights from googlefonts)
- [x] Add logo to the header
- [x] Rewrite all the styles using tailwind
- [x] Make components resusable like button, text
- [x] Setup constants for maps and color themes
- [x] Decide upon initial map zoom
- [ ] Google map styles - https://mapstyle.withgoogle.com/
- [x] Decide upon loader animations - lottie
- [x] Add back navigation button to map view screens
- [x] Make the filter screen button clickables.
- [x] Make progress with the save page and login page.
- [x] Show loader when we call the API and until markers are shown on the page.
- [x] Integrate a state management library like redux or zustand to pass data from one page to another instead of using AsyncStorage
- [x] Handle trip page's navbar's absolute bottom positioning, why is it not the same as the landing page.
- [x] Trip page buttons, on hover circular selection color around it.
- [x] Add a toast notification library
- [x] Add custom markers and callbacks
  - [ ] Add shadows to markers and callbacks
  - [ ] Render image in callback, unable to do so
- [x] Handle BottomSheet scroll
- [ ] Handle trip-generation loader properly, there is some lag
- [x] onclick button color change
- [x] Show marker as probably numbered circles with on hover info about the place in a callout
- [x] arrow up/down for timeline items
  - [ ] Timeline items animation
  - [ ] Rotate settings gear icon
- [ ] Send proper defaults from backend API route for each prompt params
- [ ] For food-stuff send me proper cuisine, and not the food as cuisine
- [ ] Handle multiple values for individual params
- [x] Day wise split, UI changes
- [ ] Handle back navigation re-request to backend API
- [ ] Edit Modal default value 
- [x] Delete timeline item causing the other list to disappear
- [ ] Button Opacity fix - use TouchableOpacity
- [ ] Add mode of transport to path drawing
- [ ] Add proper types for routes instead of using any
---

### Troubleshooting

- If styles are not reflecting, do the following
  - Just comment/uncomment fontLoaded conditional in _layout.tsx to reflect the styles
  - And run: `npm start --clear`
