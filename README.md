# Demo Implementation for an online shop making use of the looc.io Virtual Try-On

To open the demo in your browser go to https://test.looc.io/webshop/index.html.

## What you can see here

This is a sample implementation of an online shop written in [React](https://reactjs.org) that embeds the iFrame of the [looc.io](https://www.looc.io) Virtual Try-On.

## How to start on your own machine

To test this app locally, git clone the project and run
```
    yarn install
    yarn start
```

## How to interact with the Web-Try-On

The idea is to embed an iframe pointing to "tryon.looc.io/{yourbrand}" on your website.
You can provide the initial frame, color and lens to the iFrame as search parameters, i.e.
`?f=aviator&p=red&l=sun`, depending on the frames, materials and colors available.

If you want to change the contents of the Try-On after it has finished loading, you can send messages to the iframe like so:

```{javascript}
    const iframe = document.getElementById('Try-On-Frame') as HTMLIFrameElement
    iframe.contentWindow?.postMessage({ type: type, id: identifier}, domain)
```

where the type can be one of the following
- `f` for frame, with the identifier of the frame from the LooC CMS
- `p` for plastic, with the identifier of the plastic color from the LooC CMS
- `m` for metal, with the identifier of the metal color from the LooC CMS
- `l` for lens, with the identifier of the lens from the LooC CMS

and `domain` has to be provided for security reasons and should be `tryon.looc.io`.
