# YouTube Playback Speed Master

You notice the speed seems a bit off when listening music on Youtube? Keep your YouTube playback speed under your control.

## Local development

- `npm run dev` to start the development server.
- Open Chrome and navigate to `chrome://extensions/`.
- Click on `Load unpacked` and select the `dist` folder.
- Make changes and the extension will be reloaded automatically.
- Enjoy! 🎉

## Build & Publish

- `npm run build`
- Zip the `dist` folder and upload it to the Chrome Web Store.
  > [!WARNING]
  > On macOS: the built extension (~./dist) must be zipped using the `zip` command. Using the built-in macOS zip functionality will result in a broken extension. Run `zip -r SpeedChecker.zip dist` to fix this.
- Customize the `manifest.json` file to your needs.

## TODOs

- [x] Implement logic to fetch and display the current playback speed.
- [x] Add button to set the playback speed to 1x.
- [ ] Add hotkeys to toggle between different playback speeds.
- [ ] Add hotkeys to speed up and slow down the playback speed when the hotkey is longpressed.
- [ ] Add a feature to customize the appearance of the playback speed display.
