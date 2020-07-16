<div align="center">
  <img src="http://i.imgur.com/Sro1k50.png" height="96">
</div>
# Bowie Audio Tag Editor

Take a nostalgic trip back in time to when correcting audio file tags was a thing! This application will help you make quick work of that obsolete task by allowing you to automatically tag files based on the file name and path.

Supports MP3/MP4/M4A files.

## Built with...
- [Electron](http://electron.atom.io/)
- [React](https://facebook.github.io/react/)
- [Redux](http://redux.js.org/)
- [TagLib](http://taglib.github.io/)
- [taglib-ruby](https://robinst.github.io/taglib-ruby/)
- Inspiration from [Tag&Rename](http://www.softpointer.com/tr.htm), which amazingly still exists.

## Installation & Usage
You must install [Node](https://nodejs.org/en/download/) and [Homebrew](http://brew.sh/) first.

All other dependencies (Taglib, taglib-ruby, gpg, and RVM + Ruby) will be installed automatically by the app's dependency management feature. I'm working on automating the Homebrew install as well, but I'm not there yet.

```bash
# Clone this repository
git clone https://github.com/ericbiewener/bowie
# Go into the repository
cd bowie
# Install Node packages
npm install
# Launch the app
npm start
# Or launch in dev mode (Requires Gulp. Provides automatic JS & SCSS compilation upon file changes, and streams changes via BrowserSync)
gulp
```
