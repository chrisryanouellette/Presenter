# Example

This is a markdown document that can be displayed in the broswer.

# Heading 1
## Heading 2
### Heading 3
#### Heading 4

+ List Item 1
+ List Item 2
+ List Item 3
+ List Item 4

That is nothing special until you see that there has been some extra features added to the markdown!

We can add code blocks like normal,

```
const myCode = 'AMAZING";
```

But we can also add a code block with a copy button.

```copy
const iCanBeCopied = 'AMAZING';
```

We also have access to info, warning, and alert blocks.

$info Don't forget this!
$warning Don't forget this!
$alert Don't forget this!

Sadly there are no tables.

|Row 1|
|---|
|Row 1|

## Printing

You can print these files as well. If you want the background colors, expand the Print Menus "More Settings" drawer and check "Background Graphics".

## Custom Markdown

The coolest part is you can add your own parsing rules to the `frontend/src/rules.ts` file.