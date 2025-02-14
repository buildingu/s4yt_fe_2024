# s4yt_fe_2024
Welcome to the special event/'game' front-end repository for Building-u, called Dollars for Your Thoughts ($4YT). The project is for the interns from Building-u. The point system is a focal point, players can earn `Dubl-u-nes` and spend them on the raffle items provided by the raffle partners and even complete a business challenge for real cash. They can also, view sponsors and complete the sponsor quiz for additional coins. The winners of the businesses challenges and raffle items are also shown at the end of the event on the Event Results page. The application is also controlled by roles of the user and the timestamps for each period of the event, which are shown below.

## Please Note ⚠
Due to time constraints, our back-end developer leaving, and other commitments, we had to **improvise** in certain areas. This is why you'll see `Firebase` being used for the business's meet-ups and challenges. Hardcoded data is also around for some data, which is located at `src/constants/temporaryDb`. These were last-minute solutions that we had no other choice but to do.

## Timestamps
The state for the timestamps is located in `src/redux/reducers/gameConfig.ts`.
### Periods
- `register_start:` **restrictedAccess** is set and they are only allowed to the profile.
- `game_start` the 'game' has started everyone is **allowed everywhere** except for the **Event Results page**.
- `review_start` **challenge submissions** and the **raffle** are now in review and the **game is closed**, but only for the **player role**.
- `review_end` winners are now shown and everyone can only access the **Event Results page** with the **Proile page** as an exception.
- `game_end` end of the 'game' and the **Game Closed page** is always shown after login.

## Tech Used
This is a `TypeScript` `React` application built using `Craco`. The app also uses `Redux` for efficient state management, and utilizes `CSS modules` for styling.

## Getting Started
- Nodejs version 20 or greater.
- Choose either NPM or Yarn as your package manager.
- Run "npm install" or "yarn install" to install all dependencies and that's it. 

## Folder Structure
To maintain good development practices and consistency across files/folders, we recommend using the same guidelines and structure as follows if you're building upon the code. In this project we used a `reusable architecture` for all folders, so create a new `component` only if it is used in more than one file, the same goes for `utils`, `constants`, and the other folders. I am only going to be explaining things that I think are important to know and clarify aspects that may not be self-explanatory:

### components
- Each component has a folder as the name of the component and must include `index.tsx` and `styles.module.css` files.
- We use `Layout` and `Content` components, kind of like Nextjs, and they should be used in every `view`.
- The `gate` component is the `gateway` component, which is wrapped around every route.
- `src/components/forms/user` is the user form meaning where the user registers and edits their profile, it serves as both.

### redux
- The `gameConfig` is where all game-specific (it's an event, not a game) 'configurations' are, e.g. the `timestamps` for the countdown, and each `period` of the game as explained above in the Timestamps section.
- The `coinTracker` is for mulipating the coins (dubl-u-nes).
- The `user` for updating the local state of the user and the user session.
- You might notice page (view) specific reducers like `getBusinesses.ts`, `raffle.ts`, etc.
- The `actions` handles the `API calls`, essentially every action is a `redux-thunk`.
<br />

```
/
├── .env
├── craco.config.cjs
├── package.json
├── tsconfig.json
├── ...
├── node_modules/
|   └── ...
├── public/
│   ├── favicon.ico
|   ├── index.html
|   └── ...
└── src/
    ├── index.jsx
    ├── index.css
    ├── store.js
    ├── ...
    ├── components/
    |   ├── forms/
    |   |   ├── controls/
    |   |   |   ├── Input.tsx
    |   |   |   └── ...
    |   |   ├── password/
    |   |   |   ├── index.tsx
    |   |   |   └── styles.module.css
    |   |   ├── user/
    |   |   |   ├── index.tsx
    |   |   |   └── styles.module.css
    |   |   └── ...
    |   ├── gate/
    |   |   └── index.tsx
    |   ├── image/
    |   |   ├── index.tsx
    |   |   └── styles.module.css
    |   ├── loaders/
    |   |   ├── overlayLoader/
    |   |   |   └── ...
    |   |   ├── spinner/
    |   |   |   └── ...
    |   ├── modals/
    |   |   ├── ModelTemplate.tsx
    |   |   ├── areYouSure/
    |   |   |   └── ...
    |   |   ├── challengeModal/
    |   |   |   └── ...
    |   |   └── ...
    |   ├── notification/
    |   |   ├── index.tsx
    |   |   └── styles.module.css
    |   ├── partials/
    |   |   ├── content/
    |   |   |   ├── Input.tsx
    |   |   |   └── ...
    |   |   ├── currentCoins/
    |   |   |   ├── index.tsx
    |   |   |   └── styles.module.css
    |   |   ├── header/
    |   |   |   ├── index.tsx
    |   |   |   ├── Hamburger.tsx
    |   |   |   └── styles.module.css
    |   |   ├── layout/
    |   |   |   ├── index.tsx
    |   |   |   └── styles.module.css
    |   |   ├── status(footer)/
    |   |       ├── index.tsx
    |   |       └── styles.module.css
    |   └── ...
    |    
    ├── constants/ 
    |   ├── emailRegex.js
    |   ├── treasureMapNavContent.js
    |   ├── uuidRegex.js
    |   └── temporaryDb/ --- This is the temporary hardcoded data that was only used for this year as explained above.
    |       ├── businesses.js
    |       └── ...
    |    
    ├── hooks/
    |   ├── useContinueCountdown.ts --- To keep the countdown moving, which is displayed in the status component and gameEnd
    |   └── usePagination.ts            files.
    |
    ├── redux/
    |   ├── actions/
    |   |   ├── coinTracker.js
    |   |   ├── gameConfig.js
    |   |   ├── notifications.js
    |   |   ├── user.js
    |   |   ├── index.js
    |   |   └── ...
    |   └── reducers/
    |       ├── coinTracker.ts
    |       ├── gameConfig.ts
    |       ├── notifications.ts
    |       ├── user.ts
    |       ├── index.js
    |       └── ...
    |
    ├── routes/
    |   └── index.jsx --- holds data about the routes and the RoutesProvider which is used in the base index.tsx file.
    |
    ├── services/
    |   ├── errorHandler.js
    |   ├── initializeFirebase.ts --- Temporary for this year; explained above.
    |   ├── socketProvider.ts
    |   └── index.js
    |
    ├── static(assets)/
    |   ├── bg.jpg
    |   └── ...
    |    
    ├── typings/ --- All types are done in their respective files unless they need to be used elsewhere then they are put 
    |   ├── declarations.d.ts      here.
    |   ├── NotificationValues.ts
    |   └──  UserCredentials.ts
    |
    ├── utils/
    |   ├── copyToClipboard.ts
    |   ├── delay.ts
    |   ├── History.ts --- Use this for useNavigate.
    |   └── forms/
    |       ├── checkMatchingPasswords.ts
    |       ├── checkValidEmail.ts
    |       ├── checkValidity.ts
    |       ├── updateField.ts
    |       └── ...
    |
    ├── views(pages)/ --- the views are separated by game (main pages), user (auth pages), and errors (universal) folders
    |   ├── errors/       for clarity.
    |   |   ├── index.tsx
    |   |   ├── Error404.tsx
    |   |   ├── Error500.tsx
    |   |   ├── styles.module.css
    |   |   └── ...
    |   ├── game/
    |   |   ├── businesses/
    |   |   |   ├── index.tsx
    |   |   |   ├── Details.tsx
    |   |   |   └── styles.module.css
    |   |   |       └── slides/
    |   |   |           └── ...
    |   |   ├── gameClosed/
    |   |   |   ├── index.tsx
    |   |   |   └── styles.module.css
    |   |   ├── home/
    |   |   |   ├── index.tsx
    |   |   |   └── styles.module.css
    |   |   ├── raffle/
    |   |   |   ├── index.tsx
    |   |   |   └── styles.module.css
    |   |   ├── results/
    |   |   |   ├── index.tsx
    |   |   |   ├── styles.module.css
    |   |   |   └── ...
    |   |   └── sponsors/
    |   |       ├── index.tsx
    |   |       ├── styles.module.css
    |   |       └── ...
    |   └── user/
    |       ├── login/
    |       |   ├── index.tsx
    |       |   └── styles.module.css
    |       |       └── forgot/
    |       |           └── ...
    |       ├── profile/
    |       |   ├── index.tsx
    |       |   ├── coins.tsx
    |       |   ├── referrals.tsx
    |       |   └── styles.module.css
    |       |   └── ...
    |       ├── register/
    |       |   ├── index.tsx
    |       |   └── styles.module.css
    |       |       └── verifyEmail/
    |       |           └── ...
    |       └── resetPassword/
    |           ├── index.tsx
    |           └── styles.module.css
    └── ...
```
