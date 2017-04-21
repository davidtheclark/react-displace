# Changelog

## 2.2.0

- Introduce `dist/displace.js`, where `src/` now compiles to, since React 15.5+ demands `class`es, so Babel-compilation.

## 2.1.3

- Allow React 15 as peer dependency.

## 2.1.2

- Clean up anonymous container `<div>` when unmounting.

## 2.1.1

- Move `react` and `react-dom` to `peerDependencies`.

## 2.1.0

- Allow React `context` to pass to displaced element.

## 2.0.1

- Move container creation into `componentWillMount()`.

## 2.0.0

- Upgrade to React 0.14 and its companion ReactDOM.

## 1.0.1

- Try to deal with possible lack of `document` in server-side React.

## 1.0.0

- Initial release.
