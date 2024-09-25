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
    name: "Formated message",
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
        text: '<h1>Here is a formated message</h1><p><i>It use</i> <u>Html</u> <b>markup</b> to <span style="color:var(--tvk_colors_brand)">render!</span></p>',
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
