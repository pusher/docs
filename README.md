---
date: 2021-08-01
title: Readme
layout: readme.njk
permalink: docs/README/
---

# Pusher docs readme

An [Eleventy] powered static site using our custom [Tachyons] build with [Postcss] for styling.

It’s deployed and hosted by [Vercel] when the `main` branch changes using their [Github integration] - https://pusher-docs.vercel.app

## Running locally

1. Checkout the [repo](https://github.com:pusher/docs)

```bash
git checkout git@github.com:pusher/docs.git
```

2. Install the dependencies via [yarn]

```bash
yarn install
```

3. Run [Eleventy] in development mode

```bash
yarn run dev
```

[Eleventy] watches for any changes and recompiles automatically, it uses [BrowserSync] behind the scenes to refresh the browser.

### Compiling the CSS

If you’ve just checked out the repo, you’ll need to generate the css. You can also leave this running if you intend to change the CSS as you go, it will recompile and 11ty will pick up the changes and reload.

```bash
yarn run css
```

### Search

Search is powered by Algolia, on every production build a refreshed index of all content is sent to them.

For users without JS there is a fallback page which is powered by Vercel’s serverless functions.

If you need to debug this you can run the project with `vercel dev` and it will hot reload any changes.

## How to add / update new pages

1. Add a new [Markdown] file in the relevant directory or edit an existing one.
2. Add YAML front matter to the top. This should include an approved title and description and the creation date. If making a change be sure to update the date.
   For example:

```yml
---
date: 2021-08-23
title: Connection — Channels — Pusher Docs
layout: channels.njk
description: Optionally set this to override generated one
eleventyNavigation:
  parent: Using Channels
  key: Connection
---
```

3. Write up your docs, you can use [Markdown], HTML or [Nunjucks]. Although it’s best to keep it simple and stick to [Markdown] where possible.

It’s worth having a quick read of this [CSS Tricks post about words to avoid](https://css-tricks.com/words-avoid-educational-writing/)

## Advanced formatting

### Code blocks

Add the language name just after the triple backticks to get syntax highlighting. We use [Prism], the full list of [supported languages is here](https://prismjs.com/#supported-languages).

### Tabbed snippets

Sometimes it’s useful to provide multiple snippets of the same example code in multiple languages. For this we need to sprinkle a little [Nunjucks] to get things to work. We have a `snippets` [shortcode](https://github.com/pusher/docs/blob/72f74955f1c28f2149242ef60c5b9ebf660ab4b2/.eleventy.js#L83-L110) for this.

To use it open a `snippets` block and pass an array of languages that matches the markdown code blocks within. Empty lines must be between the `nunjucks` and markdown code blocks.

{% raw %}

````jinja2
{% snippets ['js', 'rb'] %}

```js
const func = (x) => x^2;
```

```rb
def func(x)
  x^2
end
```

{% endsnippets %}
````

{% endraw %}

Which will render like this

{% snippets ['js', 'rb'] %}

```js
const func = (x) => x ^ 2;
```

```rb
def func(x)
  x^2
end
```

{% endsnippets %}

#### Conditionally showing content when the snippet language is changed

You can change other content when the snippet changed to do this you must add a boolean to the snippet declaration and wrap in container

{% raw %}

````jinja2
{% snippets ['js', 'swift', 'laravelecho'], true %}

```js
pusher.unsubscribe(channelName);
```

```swift
[self.pusher unsubscribeFromChannel:channel];
```

```js
Echo.leaveChannel(channelName);
```

{% endsnippets %}

#### Parameters

{% parameter 'channelName', 'string', true, 'js,laravelecho' %}

The name of the channel to unsubscribe from.

{% endparameter %}

{% parameter 'channel', 'PTPusherChannel', true, 'swift', false %}

The name of the channel to unsubscribe from.

{% endparameter %}
{% endmethodwrap %}
````

{% endraw %}

### Parameter shortcode syntax

#### Parameters

{% parameter 'name', 'String', true %}

The name of the parameter

{% endparameter %}

{% parameter 'type', 'String', false %}

Can be either:

- A string detailing the type like `object` or `string`
- or `null` if you don’t want a type at all (Default)

{% endparameter %}

{% parameter 'required', 'Boolean or null', false %}

Can be either:

- `true` - will show 'required' styled appropriately
- `false` - will show 'optional' styled appropriately
- `null` - won’t show anything (Default)

{% endparameter %}

{% parameter 'language', 'String', false %}

This is for when you want to show it conditionally, should match the tabbed snippet label, e.g. `js`.
Defaults to `null`.

{% endparameter %}

{% parameter 'show', 'Boolean', false %}

This is for when you want to show it conditionally, and controls whether it should be visible by default.
Defaults to `true`.

{% endparameter %}

#### Example

{% raw %}

```jinja2

{% parameter 'channel', 'PTPusherChannel', true, 'swift', false %}

The name of the channel to unsubscribe from.

{% endparameter %}

```

{% endraw %}

## Contribute

Contributions welcome!

[eleventy]: https://www.11ty.io
[tachyons]: http://tachyons.io/
[postcss]: https://postcss.org
[vercel]: https://vercel.co/
[github integration]: https://vercel.com/docs/git-integrations
[markdown]: https://www.markdownguide.org/
[yarn]: https://yarnpkg.com/
[browsersync]: https://www.browsersync.io/
[prism]: https://prismjs.com/
[nunjucks]: https://mozilla.github.io/nunjucks/
