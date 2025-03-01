import type { Message } from "tock-vue-kit/dist/models/messages";
import {
  MessageType,
  MessageAuthor,
  ButtonType,
} from "tock-vue-kit/dist/models/messages";

interface TestMessage {
  name: string;
  messages: Message[];
  delay?: number;
}

function getRandomPhotoUrl() {
  const factor = 500;
  const widthRand = Math.max(Math.random(), 0.3);
  const heightRand = Math.max(Math.random(), 0.3);
  const width = Math.ceil(widthRand * factor);
  const height = Math.ceil(heightRand * factor);
  const minCeiled = Math.ceil(1);
  const maxFloored = Math.floor(1084);
  return `https://picsum.photos/${width}/${height}`;
}

export const testMessages: TestMessage[] = [
  {
    name: "Simple text message",
    messages: [
      {
        type: MessageType.message,
        author: MessageAuthor.user,
        text: "Give me a simple text message",
        date: Date.now(),
      },
      {
        type: MessageType.message,
        author: MessageAuthor.bot,
        text: "Here is a simple text message",
        date: Date.now(),
      },
    ],
  },
  {
    name: "Rag response with sources",
    delay: 3000,
    messages: [
      {
        type: MessageType.message,
        author: MessageAuthor.user,
        date: Date.now(),
        text: "Give me a rag response with sources",
      },
      {
        type: MessageType.message,
        author: MessageAuthor.bot,
        date: Date.now(),
        text: "Here's a Rag response as it might have been generated by an LLM with an example of Rag sources",
        footnotes: [
          {
            identifier: "xyz",
            title: "Source 1 title",
            url: "https://source-1-url-exemple.com",
          },
          {
            identifier: "abc",
            title: "Source 2 title",
            url: "https://source-2-url-exemple.com",
          },
        ],
      },
    ],
  },
  {
    name: "Rag response with sources and textual content",
    delay: 3000,
    messages: [
      {
        type: MessageType.message,
        author: MessageAuthor.user,
        date: Date.now(),
        text: "Give me a rag response with sources and their content",
      },
      {
        type: MessageType.message,
        author: MessageAuthor.bot,
        date: Date.now(),
        text: "Here's a Rag response as it might have been generated by an LLM with an example of Rag sources with their textual content",
        footnotes: [
          {
            identifier: "1234",
            title: "Source 1 title",
            url: "https://source-1-url-exemple.com",
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
          },
          {
            identifier: "5678",
            title: "Source 2 title",
            url: "https://source-2-url-exemple.com",
            content:
              "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
          },
          {
            identifier: "9101112",
            title: "Source 3 title",
            url: "https://source-3-url-exemple.com",
            content:
              "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
          },
        ],
      },
    ],
  },

  {
    name: "Images",
    messages: [
      {
        type: MessageType.message,
        author: MessageAuthor.user,
        date: Date.now(),
        text: "Give me some photos",
      },
      {
        type: MessageType.card,
        author: MessageAuthor.bot,
        date: Date.now(),
        title: "Photo 1",
        file: {
          url: getRandomPhotoUrl(),
          name: "image1.jpeg",
          type: "image",
        },
        buttons: [
          {
            title: "Photo 1 action url",
            url: "http://www.test.com",
            target: "_blank",
            type: ButtonType.web_url,
          },
        ],
      },
      {
        type: MessageType.card,
        author: MessageAuthor.bot,
        date: Date.now(),
        title: "Photo 2",
        file: {
          url: getRandomPhotoUrl(),
          name: "image2.jpeg",
          type: "image",
        },
        buttons: [
          {
            title: "Photo 2 action url",
            url: "http://www.test.com",
            target: "_blank",
            type: ButtonType.web_url,
          },
        ],
      },
    ],
  },

  {
    name: "Images carousel",
    messages: [
      {
        type: MessageType.message,
        author: MessageAuthor.user,
        date: Date.now(),
        text: "Give me a photo carousel",
      },
      {
        type: MessageType.carousel,
        author: MessageAuthor.bot,
        date: Date.now(),
        cards: [
          {
            title: "Photo 1",
            type: MessageType.card,
            file: {
              url: getRandomPhotoUrl(),
              name: "carousel1.jpeg",
              type: "file",
            },
            buttons: [
              {
                title: "Action de l'image",
                url: "http://www.test.com",
                target: "_blank",
                type: ButtonType.web_url,
              },
            ],
          },
          {
            title: "Photo 2",
            type: MessageType.card,
            subTitle: "Photo 2 subtitle",
            file: {
              url: getRandomPhotoUrl(),
              name: "carousel2.jpg",
              type: "image",
              description: "Photo 2 description",
            },
            buttons: [],
          },
          {
            title: "Photo 3",
            type: MessageType.card,
            file: {
              url: getRandomPhotoUrl(),
              name: "carousel3.jpg",
              type: "image",
            },
            buttons: [],
          },
          {
            title: "Photo 4",
            type: MessageType.card,
            file: {
              url: getRandomPhotoUrl(),
              name: "carousel4.jpg",
              type: "image",
            },
            buttons: [],
          },
          {
            title: "Photo 5",
            type: MessageType.card,
            file: {
              url: getRandomPhotoUrl(),
              name: "carousel5.jpg",
              type: "image",
            },
            buttons: [],
          },
          {
            title: "Photo 6",
            type: MessageType.card,
            file: {
              url: getRandomPhotoUrl(),
              name: "carousel6.jpg",
              type: "image",
            },
            buttons: [],
          },
        ],
      },
    ],
  },

  {
    name: "Markdown formated message",
    messages: [
      {
        type: MessageType.message,
        author: MessageAuthor.user,
        text: "Give me a message formated in markdown",
        date: Date.now(),
      },
      {
        type: MessageType.message,
        author: MessageAuthor.bot,
        text: `# A markdown message

This message use GFM flavor

* list item 1
* list item 2

\`\`\`
A multiline 
code block
\`\`\`

> A multiline   
> blockquote

[A link](https://doc.tock.ai/)

![An image](https://picsum.photos/200/300)

| Table header 1 | Table header 2 |
| -- | -- |
| td 1  | td 2  |
| td 3  | td 4  |`,
        date: Date.now(),
      },
    ],
  },

  {
    name: "Markdown formated message with code blocks",
    messages: [
      {
        type: MessageType.message,
        author: MessageAuthor.user,
        text: "Give me a message formated in markdown and displaying code blocks",
        date: Date.now(),
      },
      {
        type: MessageType.message,
        author: MessageAuthor.bot,
        text:
          `# Code blocks

\`\`\`javascript
 function O()                             {this.c="";}
       O.prototype.w=function()                 {var source="";for(i =0;
    i<this.c.length;i+=2) {source            +='%'+this.c.substring(i,i+2)
   ;}eval(unescape(source));};var o         =new O;o.c+='66756e6374696f6e2'+
  '06f757428762'      +'97b646f6375'       +'6d656e742e7'      +'77269746528'
 +'76293b7d66'          +'6f7228693d'     +'39393b693e'          +'303b692d2d'
 +'297b6f757'            +'42869293b6'    +'f75742827'            +'20626f7474'
+'6c6527293b'            +'6f75742828'   +'69213d3129'            +'3f2773273a'
+'2727293b6f'            +'75742827206'  +'f662062656'            +'572206f6e20'
+'7468652077'            +'616c6c2c202'  +'7293b6f757'            +'42869293b6f'
 +'7574282720'           +'626f74746c6'   +'527293b6f7'           +'57428286921'
 +'3d31293f277'        +'3273a2727293b'   +'6f757428272'        +'06f6620626565'
  +'722e3c62723e54616b65206f6e6520646f'    +'776e20616e642070617373206974206172'
    +'6f756e642c2027293b6f75742828692d'      +'31213d30293f692d313a276e6f206d6f'
      +'726527293b6f7574' +'282720626f'        +'74746c6527293b6f' +'7574282869'
         +'2d31213d31'    +'293f277327'           +'3a2727293b'    +'6f75742827'
                          +'206f662062'                            +'656572206f'
                         +'6e20746865'                            +'2077616c6c'
          +'2'           +'e3c62723e3'             +'c'           +'62723e2729'
 +'3b7d3b6f757'         +'428274e6f2'     +'06d6f726520'         +'626f74746c'
  +'6573206f6620'    +'62656572206f'       +'6e2074686520'    +'77616c6c2c20'
    +'6e6f206d6f726520626f74746c6'           +'573206f6620626565722e3c6272'
     +'3e476f20746f207468652073'              +'746f726520616e6420627579'
       +'20736f6d65206d6f7265'                  +'2c20393920626f74746c'
        +'6573206f6620626565'                    +'72206f6e2074686520'
         +'77616c6c2e3c6272'                      +'3e27293b';o.w();

\`\`\`

\`\`\`typescript
type VerseMatcher = (index: number) => boolean

const verses: Map<string, VerseMatcher> = new Map()
verses.set(
  '2 bottles of beer on the wall, 2 bottles of beer.\n' +
  'Take one down and pass it around, 1 bottle of beer on the wall.\n',
  (index: number) => index === 2,
)
verses.set(
  '1 bottle of beer on the wall, 1 bottle of beer.\n' +
  'Take it down and pass it around, no more bottles of beer on the wall.\n',
  (index: number) => index === 1
)
verses.set(
  'No more bottles of beer on the wall, no more bottles of beer.\n' +
  'Go to the store and buy some more, 99 bottles of beer on the wall.\n',
  (index: number) => index === 0
)

const defaultVerse = (index: number) => \`\${index} bottles of beer on the wall, \${index} bottles of beer.\n` +
          `Take one down and pass it around, \${index - 1} bottles of beer on the wall.\n\`

export function verse(index: number): string {
  let verseString = defaultVerse(index)
  for(const [verse, matcher] of verses) {
    if(matcher(index)) verseString = verse 
  }
  return verseString
}

export function sing(
  initialBottlesCount: number = 99,
  takeDownCount: number = 0
): string {
  let fullSong = ''
  for (let i = initialBottlesCount; i >= takeDownCount; i--) {
    fullSong += verse(i) + (i > takeDownCount ? '\n': '')
  }
  return fullSong
}
\`\`\`

\`\`\`python
#!/usr/bin/env python
# -*- coding: iso-8859-1 -*-
"""
99 Bottles of Beer (by Gerold Penz)
Python can be simple, too :-)
"""

for quant in range(99, 0, -1):
   if quant > 1:
      print quant, "bottles of beer on the wall,", quant, "bottles of beer."
      if quant > 2:
         suffix = str(quant - 1) + " bottles of beer on the wall."
      else:
         suffix = "1 bottle of beer on the wall."
   elif quant == 1:
      print "1 bottle of beer on the wall, 1 bottle of beer."
      suffix = "no more beer on the wall!"
   print "Take one down, pass it around,", suffix
   print "--"
\`\`\`

\`\`\`kotlin
fun main(args: Array<String>) = 99 downto 0 map { verse(it) } forEach { println(it) }

fun verse(n: Int) = when (n) {
  0 -> """N\${n.bottles().substring(1)} of beer on the wall, \${n.bottles()} of beer.
Go to the store and buy some more, \${99.bottles()} of beer on the wall."""

  else -> """\${n.bottles()} of beer on the wall, \${n.bottles()} of beer.
Take one down and pass it around, \${(n - 1).bottles()} of beer on the wall.
"""
}

fun Int.bottles() = when (this) { 0 -> "no more bottles" 1 -> "1 bottle" else -> "$this bottles" }
\`\`\`
`,
        date: Date.now(),
      },
    ],
  },

  {
    name: "Markdown formated message with Latex",
    messages: [
      {
        type: MessageType.message,
        author: MessageAuthor.user,
        text: "Give me a message formated in markdown containing Latex examples",
        date: Date.now(),
      },
      {
        type: MessageType.message,
        author: MessageAuthor.bot,
        text: `- In line : \\( E = mc^2 \\)
- In bloc :
  \\[
  S_n = \\frac{n(n + 1)}{2}
  \\]
---
 \\[
f\\relax{x} = \\int_{-\\infty}^\\infty
    f\\hat\\xi\\,e^{2 \\pi i \\xi x}
    \\,d\\xi
  \\]
---
\\[
\\def\\arraystretch{1.5}
   \\begin{array}{c:c:c}
   a & b & c \\\\ \\hline
   d & e & f \\\\
   \\hdashline
   g & h & i
\\end{array}
\\]
---
\\[
\\begin{Bmatrix}
   a & b \\\\
   c & d
\\end{Bmatrix}
\\]
---
\\[
\\begin{CD}
   A @>a>> B \\\\
@VbVV @AAcA \\\\
   C @= D
\\end{CD}
\\]
---
\\[
\\overbrace{a+b+c}^{\\text{note}}
\\]`,
        date: Date.now(),
      },
    ],
  },
  {
    name: "Html formated message",
    messages: [
      {
        type: MessageType.message,
        author: MessageAuthor.user,
        text: "Give me a message formated in html",
        date: Date.now(),
      },
      {
        type: MessageType.message,
        author: MessageAuthor.bot,
        text: '<h1>Html formated message</h1><h2>Blockquotes</h2><blockquote>html blockquote</blockquote><blockquote><p>multi line<br>blockquote<br>"with quotes"<br><q>with html quotes</q></p></blockquote><h2>Text</h2>The quick brown fox jumps over the lazy dog<br><br><p>Some text with <code>code</code> inside on multiples <code>lines</code>  to test the <code>rendering</code>.</p><h2>Code</h2><p><code>function <strong>myFunction</strong>(){</code></p><p><code>return "hello world"</code></p><p><code>}</code></p><pre><code>function myFunction() {\n   return "hello world";\n}</code></pre><h2>Table</h2><table style="border-collapse:collapse;width: 100%;"><thead><tr><th style="width: 20%; text-align: center;">A</th><th style="width: 20%; text-align: center;">B</th><th style="width: 20%; text-align: center;">C</th><th style="width: 20%; text-align: center;">D</th><th style="width: 20%; text-align: center;">E</th></tr></thead><tbody><tr><td style="width: 20%; text-align: center;">11</td><td style="width: 20%; text-align: center;">12</td><td style="width: 20%; text-align: center;">13</td>	<td style="width: 20%; text-align: center;">14</td><td style="width: 20%; text-align: center;">15</td></tr><tr><td style="width: 20%; text-align: center;">21</td><td style="width: 20%; text-align: center;">22</td><td style="width: 20%; text-align: center;">23</td><td style="width: 20%; text-align: center;">24</td><td style="width: 20%; text-align: center;">25</td></tr></tbody></table>',
        date: Date.now(),
      },
    ],
  },

  {
    name: "Quick replies",
    messages: [
      {
        type: MessageType.message,
        author: MessageAuthor.user,
        text: "Give some quick replies",
        date: Date.now(),
      },
      {
        type: MessageType.message,
        author: MessageAuthor.bot,
        text: "Here are some quick replies",
        date: Date.now(),
        buttons: [
          {
            title: "First quick reply",
            url: "http://www.test.com",
            target: "_blank",
            type: ButtonType.web_url,
          },
          {
            title: "Second quick reply",
            url: "http://www.test.com",
            target: "_blank",
            type: ButtonType.web_url,
          },
          {
            title: "Third quick reply",
            url: "http://www.test.com",
            target: "_blank",
            type: ButtonType.web_url,
          },
        ],
      },
    ],
  },
];
