import type { Template } from "../models/template";
import { personSvg, robotSvg } from "./images";

const tockEndpointUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/io/01/cmb/web"
    : "https://demo-bot.tock.ai/io/tock/tockbot/web";

export const templates: Template[] = [
  {
    active: false,
    name: "Default",
    description: "Default settings only. No local storage.",
    tockUrl: tockEndpointUrl,
  },
  {
    active: false,
    name: "Messenger",
    tockUrl: tockEndpointUrl,
    description: "Classic messenger style",
    options: {
      localStorage: {
        enabled: true,
      },
      initialization: {
        welcomeMessage: "Welcome. How can i can help you ?",
      },
      preferences: {
        messages: {
          message: {
            header: {
              label: {
                display: false,
              },
            },
          },
        },
      },
    },
    styling: {
      "--tvk_base_radius": "1em",
      "--tvk_base_spacing": "0.6em",
      "--tvk_colors_brand-hue": "215",
      "--tvk_colors_brand-saturation": "100%",
      "--tvk_colors_dark_background": "#13171f",
      "--tvk_colors_dark_brand":
        "hsl( var(--tvk_colors_brand-hue) var(--tvk_colors_brand-saturation) 40% )",
      "--tvk_colors_light_background": "white",
      "--tvk_colors_light_surface2": "hsl(var(--tvk_colors_brand-hue) 10% 95%)",
      "--tvk_footnotes_footnote_background": "none",
      "--tvk_footnotes_margin": "1em 0em 0em 0em",
      "--tvk_message_answer_bot_align-items": "end",
      "--tvk_message_answer_bot_flex-direction": "row",
      "--tvk_message_answer_flex-direction": "row",
      "--tvk_message_answer_flex-wrap": "nowrap",
      "--tvk_message_answer_gap": "var(--tvk_base_spacing)",
      "--tvk_message_answer_user_flex-direction": "row-reverse",
      "--tvk_message_body_bot_radius-bottom-left": "0",
      "--tvk_message_body_bot_radius-top-left":
        "var(--tvk_message_body_radius)",
      "--tvk_message_body_max-width": "calc(100% - 2em)",
      "--tvk_message_body_user_radius-bottom-right": "0",
      "--tvk_message_body_user_radius-top-right":
        "var(--tvk_message_body_radius)",
      "--tvk_message_header_avatar_font-size": "16px",
      "--tvk_message_header_margin": "0em",
      "--tvk_question_background": "var(--tvk_colors_background)",
      "--tvk_question_border": "1px solid var(--tvk_colors_neutral)",
      "--tvk_question_box-shadow": "inset 0px 0px 5px #00000030",
      "--tvk_wrapper_padding": "var(--tvk_base_spacing)",
    },
  },

  {
    active: false,
    name: "Vertical",
    description: "Left-aligned, image avatars",
    tockUrl: tockEndpointUrl,
    options: {
      localStorage: {
        enabled: true,
      },
      preferences: {
        messages: {
          hideIfNoMessages: false,
          message: {
            header: {
              avatar: {
                userImage: {
                  src: "https://picsum.photos/id/64/200/200",
                  width: "2em",
                  height: "2em",
                },
                botImage: {
                  src: "https://picsum.photos/id/433/200/200",
                  width: "2em",
                  height: "2em",
                },
              },
              label: {
                display: false,
              },
            },
          },
        },
        questionBar: {
          clearHistory: {
            display: false,
          },
        },
      },
    },
    styling: {
      "--tvk_base_box-shadow": "0 0px 5px 0px rgba(0, 0, 0, 0.12)",
      "--tvk_base_font-size": "1rem",
      "--tvk_base_radius": "0.7em",
      "--tvk_base_spacing": "0.6em",
      "--tvk_colors_brand-hue": "80",
      "--tvk_colors_brand-lightness": "34%",
      "--tvk_colors_brand-saturation": "90%",
      "--tvk_colors_dark_background": "hsl(var(--tvk_colors_brand-hue) 0% 0%)",
      "--tvk_colors_light_background":
        "hsl(var(--tvk_colors_brand-hue) 0% 100%)",
      "--tvk_colors_light_surface2": "hsl(var(--tvk_colors_brand-hue) 10% 93%)",
      "--tvk_message_answer_bot_border-left":
        "1px solid var(--tvk_colors_neutral)",
      "--tvk_message_answer_bot_flex-direction": "row",
      "--tvk_message_answer_bot_padding": "0 0 1em 0",
      "--tvk_message_answer_user_align-items": "start",
      "--tvk_message_answer_user_border-left":
        "1px solid var(--tvk_colors_neutral)",
      "--tvk_message_answer_user_flex-direction": "row",
      "--tvk_message_answer_user_justify-content": "start",
      "--tvk_message_body_bot_background": "unset",
      "--tvk_message_body_bot_box-shadow": "none",
      "--tvk_message_body_max-width": "calc(100% - 4.6em)",
      "--tvk_message_body_padding": "0",
      "--tvk_message_body_user_background": "unset",
      "--tvk_message_body_user_box-shadow": "none",
      "--tvk_message_body_user_color": "var(--tvk_colors_text2)",
      "--tvk_message_body_user_font-weight": "bold",
      "--tvk_message_header_avatar_bot_background": "none",
      "--tvk_message_header_avatar_bot_padding": "0",
      "--tvk_message_header_avatar_box-shadow": "0px 3px 5px #00000050",
      "--tvk_message_header_avatar_img-border-radius": "50%",
      "--tvk_message_header_avatar_padding": "0em",
      "--tvk_message_header_avatar_user_background": "none",
      "--tvk_message_header_avatar_user_padding": "0",
      "--tvk_message_header_margin": "0em 1.5em 0 -1em",
      "--tvk_message_margin": "1em 0em 1.5em 1em",
      "--tvk_question_border": "1px solid var(--tvk_colors_neutral)",
      "--tvk_question_btn-submit_border-radius": "var(--tvk_base_radius)",
      "--tvk_wrapper_line-height": "1.5",
    },
  },

  {
    active: false,
    name: "Contemporary",
    description: "A contemporary look",
    tockUrl: tockEndpointUrl,
    options: {
      localStorage: {
        enabled: true,
      },
      // initialization: {
      //   extraHeaders: {
      //     "Current-Mail-User": "test@test.com",
      //   },
      // },
    },
    styling: {
      "--tvk_base_box-shadow": "0 1px 4px 1px rgba(0, 0, 0, 0.12)",
      "--tvk_colors_brand-hue": "380",
      "--tvk_colors_brand-lightness": "54%",
      "--tvk_colors_brand-saturation": "90%",
      "--tvk_footnotes_footnote_border-radius": "0.3em",
      "--tvk_wrapper_border-radius": "var(--tvk_base_spacing)",
      "--tvk_wrapper_padding": "1.5em",
    },
  },

  {
    active: false,
    name: "Light",
    description: "Minimalist, left-aligned layout",
    tockUrl: tockEndpointUrl,
    options: {
      localStorage: {
        enabled: true,
      },
      preferences: {
        messages: {
          message: {
            header: {
              avatar: {
                botImage: {
                  src: robotSvg,
                  width: "1.3em",
                  height: "1.3em",
                },
              },
            },
          },
        },
      },
    },
    styling: {
      "--tvk_button_action-background": "var(--tvk_colors_brand)",
      "--tvk_button_action-color": "white",
      "--tvk_colors_brand-hue": "225",
      "--tvk_colors_brand-lightness": "49%",
      "--tvk_colors_brand-saturation": "82%",
      "--tvk_colors_dark_background": "#13171f",
      "--tvk_colors_dark_links": "hsl(var(--tvk_colors_brand-hue) 75% 65%)",
      "--tvk_colors_dark_text2": "white",
      "--tvk_colors_light_background": "white",
      "--tvk_colors_light_text1": "var(--tvk_colors_light_text2)",
      "--tvk_colors_light_text2": "hsl(var(--tvk_colors_brand-hue) 0% 30%)",
      "--tvk_footnotes_footnote_border":
        "1px solid var(--tvk_colors_dark_links)",
      "--tvk_footnotes_footnote_border-radius": "var(--tvk_base_radius)",
      "--tvk_footnotes_footnote_line-height": "1.5em",
      "--tvk_message_answer_user_align-items": "start",
      "--tvk_message_body_bot_background": "transparent",
      "--tvk_message_body_padding": "0 0 0 2.4em",
      "--tvk_message_body_user_background": "transparent",
      "--tvk_message_header_avatar_bot_background": "transparent",
      "--tvk_message_header_avatar_bot_color": "inherit",
      "--tvk_message_header_avatar_bot_padding": "0 2px 0 3px",
      "--tvk_message_header_avatar_user_background": "#d1dbfa",
      "--tvk_message_header_avatar_user_color": "#123bb6",
      "--tvk_message_header_font-size": "16px",
      "--tvk_message_header_user_flex-direction": "row",
      "--tvk_message_margin": "0 0 1rem 0",
      "--tvk_question_border": "1px solid rgb(209, 209, 209)",
      "--tvk_question_btn-submit_color": "var(--tvk_colors_neutral)",
      "--tvk_wrapper_links_text-decoration": "underline",
      "--tvk_wrapper_min-height": "70vh",
      "--tvk_wrapper_padding": "0",
    },
  },
  {
    active: false,
    name: "Ladylike",
    description: "Elegance is not to be noticed, but to be remembered",
    tockUrl: tockEndpointUrl,
    options: {
      localStorage: {
        enabled: true,
        maxNumberMessages: 50,
      },
      initialization: {
        openingMessage: "Hello",
      },
      preferences: {
        messages: {
          hideIfNoMessages: false,
          message: {
            header: {
              avatar: {
                userImage: {
                  src: "https://picsum.photos/id/64/200/200",
                  width: "2em",
                  height: "2em",
                },
                botImage: {
                  src: "https://picsum.photos/id/433/200/200",
                  width: "2em",
                  height: "2em",
                },
              },
              label: {
                display: false,
              },
            },
          },
          footNotes: {
            requireSourcesContent: true,
            clampSourceContentNbLines: 4,
          },
        },
      },
      wording: {
        messages: {
          message: {
            header: {
              labelUser: "Human",
              labelBot: "Chatbot",
            },
          },
        },
      },
    },
    styling: {
      "--tvk_base_radius": "0",
      "--tvk_button_action-color": "var(--tvk_colors_light_neutral)",
      "--tvk_colors_brand-hue": "190",
      "--tvk_colors_brand-lightness": "40%",
      "--tvk_colors_brand-saturation": "50%",
      "--tvk_colors_dark_background": "#13171f",
      "--tvk_colors_dark_links": "var(--tvk_colors_light_neutral)",
      "--tvk_colors_dark_neutral": "hsl(var(--tvk_colors_brand-hue) 10% 12%)",
      "--tvk_colors_dark_surface2": "hsl(var(--tvk_colors_brand-hue) 0% 15%)",
      "--tvk_colors_light_background": "white",
      "--tvk_colors_light_neutral": "hsl(var(--tvk_colors_brand-hue) 0% 97%)",
      "--tvk_colors_light_neutral-dim":
        "hsl(var(--tvk_colors_brand-hue) 5% 88%)",
      "--tvk_colors_light_text1": "hsl(var(--tvk_colors_brand-hue) 0% 10%)",
      "--tvk_colors_light_text2": "hsl(var(--tvk_colors_brand-hue) 0% 30%)",
      "--tvk_footnotes_footnote_background": "var(--tvk_colors_neutral-dim)",
      "--tvk_footnotes_footnote_line-height": "1.3",
      "--tvk_footnotes_footnote_padding": "1em",
      "--tvk_footnotes_footnote_title_font-weight": "bold",
      "--tvk_message_answer_bot_background": "var(--tvk_colors_neutral)",
      "--tvk_message_answer_bot_border-bottom":
        "1px solid var(--tvk_colors_neutral-dim)",
      "--tvk_message_answer_bot_border-top":
        "1px solid var(--tvk_colors_neutral-dim)",
      "--tvk_message_answer_bot_flex-direction": "row",
      "--tvk_message_answer_bot_padding": "2em",
      "--tvk_message_answer_flex-direction": "row",
      "--tvk_message_answer_flex-wrap": "nowrap",
      "--tvk_message_answer_gap": "0.7em",
      "--tvk_message_answer_user_align-items": "start",
      "--tvk_message_answer_user_flex-direction": "row",
      "--tvk_message_answer_user_justify-content": "start",
      "--tvk_message_answer_user_padding": "2em",
      "--tvk_message_body_max-width": "95%",
      "--tvk_message_body_bot_background": "unset",
      "--tvk_message_body_user_background": "unset",
      "--tvk_message_header_avatar_padding": "0em",
      "--tvk_message_header_avatar_radius": "unset",
      "--tvk_message_header_avatar_user_color": "var(--tvk_colors_neutral)",
      "--tvk_message_header_margin": "0em",
      "--tvk_message_margin": "0em",
      "--tvk_question_box-shadow": "0px 0px 15px #00000030",
      "--tvk_question_btn-submit_color": "var(--tvk_colors_neutral)",
      "--tvk_question_chars-count_display": "none",
      "--tvk_wrapper_line-height": "1.5",
      "--tvk_wrapper_min-height": "85vh",
    },
  },
  {
    active: false,
    name: "Square",
    description: "Being a square keeps you from going around in circles",
    tockUrl: tockEndpointUrl,
    options: {
      localStorage: {
        enabled: true,
      },
      preferences: {
        messages: {
          message: {
            header: {
              avatar: {
                display: false,
              },
            },
          },
        },
      },
    },
    styling: {
      "--tvk_base_radius": "0",
      "--tvk_colors_brand-hue": "225",
      "--tvk_colors_brand-lightness": "40%",
      "--tvk_colors_brand-saturation": "74%",
      "--tvk_footnotes_flex-wrap": "nowrap",
      "--tvk_footnotes_footnote_background": "transparent",
      "--tvk_footnotes_footnote_border": "2px solid var(--tvk_colors_brand)",
      "--tvk_footnotes_margin": "2em 0em 0em 0em",
      "--tvk_message_header_avatar_radius": "unset",
      "--tvk_message_header_font-weight": "300",
      "--tvk_wrapper_border": "1px solid var(--tvk_colors_neutral-dim)",
      "--tvk_wrapper_box-shadow": "0px 0px 5px #00000040",
    },
  },

  {
    active: false,
    name: "Funny",
    description: "Happy and colorful",
    tockUrl: tockEndpointUrl,
    options: {
      localStorage: {
        enabled: true,
      },
      preferences: {
        messages: {
          hideIfNoMessages: false,
          message: {
            header: {
              label: {
                display: false,
              },
              avatar: {
                display: true,
                botImage: {
                  src: robotSvg,
                  width: "1em",
                  height: "1em",
                },
                userImage: {
                  src: personSvg,
                  width: "1em",
                  height: "1em",
                },
              },
            },
          },
        },
      },
    },
    styling: {
      "--tvk_base_box-shadow": "3px 3px 0px var(--tvk_colors_neutral-dim)",
      "--tvk_base_radius": "2em",
      "--tvk_colors_brand-hue": "280",
      "--tvk_colors_brand-lightness": "69%",
      "--tvk_colors_brand-saturation": "86%",
      "--tvk_colors_dark_background":
        "hsl(var(--tvk_colors_brand-hue) 15% 20%)",
      "--tvk_colors_light_background":
        "hsl(var(--tvk_colors_brand-hue) 25% 90%)",
      "--tvk_colors_light_neutral-dim":
        "hsl(var(--tvk_colors_brand-hue) 5% 80%)",
      "--tvk_footnotes_align-items": "start",
      "--tvk_footnotes_margin": "1.5em 0 0 0",
      "--tvk_message_answer_bot_flex-direction": "row",
      "--tvk_message_answer_flex-direction": "row",
      "--tvk_message_answer_flex-wrap": "nowrap",
      "--tvk_message_answer_gap": "var(--tvk_base_spacing)",
      "--tvk_message_answer_user_flex-direction": "row",
      "--tvk_message_body_grow": "1",
      "--tvk_message_body_padding": "1em",
      "--tvk_message_body_max-width": "calc(100% - 3.7em)",
      "--tvk_message_body_user_radius-top-left": "0",
      "--tvk_message_body_user_radius-top-right":
        "var(--tvk_message_body_radius)",
      "--tvk_message_flex-wrap": "nowrap",
      "--tvk_message_header_avatar_bot_color": "inherit",
      "--tvk_message_header_avatar_line-height": "0.9",
      "--tvk_message_header_avatar_padding": "0.3em 0.4em",
      "--tvk_message_header_font-size": "180%",
      "--tvk_message_header_margin": "0em 0em 0.1em 0em",
      "--tvk_message_margin": "0 0 1em 0",
      "--tvk_question_padding": "0.5em 1.5em",
      "--tvk_question_radius": "3em",
      "--tvk_wrapper_border-radius": "2em",
      "--tvk_wrapper_flex-direction": "column-reverse",
      "--tvk_wrapper_height": "100vh",
    },
  },

  {
    active: false,
    name: "Query/Answer",
    description: "Query/Answer mode",
    tockUrl: tockEndpointUrl,
    options: {
      localStorage: {
        enabled: true,
      },
      preferences: {
        messages: {
          clearOnNewRequest: true,
          message: {
            hideUserMessages: true,
            header: {
              display: false,
            },
          },
        },
        questionBar: {
          clearTypedCharsOnSubmit: false,
          clearHistory: {
            display: false,
          },
          submit: {
            icon: "bi bi-search",
          },
        },
      },
      wording: {
        messages: {
          message: {
            header: {
              labelUser: "Vous",
              labelBot: "RHoBOT",
            },
            footnotes: {
              sources: "Documentary sources used to synthesize information :",
              showMoreLink: "Voir plus",
            },
          },
        },
        questionBar: {
          input: {
            placeholder: "Ask your question to the bot",
          },
        },
      },
    },
    styling: {
      "--tvk_base_box-shadow": "0px 6px 6px 0px #0000001a",
      "--tvk_base_font-size": "0.9em",
      "--tvk_base_radius": "20px",
      "--tvk_colors_brand-hue": "358",
      "--tvk_colors_brand-lightness": "54%",
      "--tvk_colors_brand-saturation": "74%",
      "--tvk_colors_dark_background": "transparent",
      "--tvk_colors_light_background": "transparent",
      "--tvk_colors_dark_surface2": "hsl(var(--tvk_colors_brand-hue) 3% 15%)",
      "--tvk_colors_light_surface2": "hsl(var(--tvk_colors_brand-hue) 10% 97%)",
      "--tvk_footnotes_align-items": "start",
      "--tvk_footnotes_flex-direction": "column",
      "--tvk_footnotes_margin": "1.5em 0 0 0",
      "--tvk_message_body_border": "1px solid var(--tvk_colors_neutral)",
      "--tvk_message_body_bot_radius-top-left":
        "var(--tvk_message_body_radius)",
      "--tvk_message_body_grow": "1",
      "--tvk_message_body_padding": "2em 1em",
      "--tvk_message_user_margin": "1em 0",
      "--tvk_messages_overflow": "visible",
      "--tvk_messages_padding": "0",
      "--tvk_question_border": "1px solid var(--tvk_colors_neutral)",
      "--tvk_question_box-shadow": "none",
      "--tvk_question_chars-count_display": "none",
      "--tvk_question_margin": "0em",
      "--tvk_question_padding": "0.5em",
      "--tvk_question_radius": "5px",
      "--tvk_wrapper_flex-direction": "column-reverse",
      "--tvk_wrapper_gap": "1em",
      "--tvk_wrapper_max-height": "auto",
      "--tvk_wrapper_padding": "0em",
    },
  },

  {
    active: false,
    name: "Query/Answer splitted",
    description: "Query/Answer mode with splitted sources display",
    tockUrl: tockEndpointUrl,
    options: {
      localStorage: {
        enabled: true,
      },
      preferences: {
        messages: {
          clearOnNewRequest: true,
          message: {
            hideUserMessages: true,
            header: {
              display: false,
            },
          },
          footNotes: {
            requireSourcesContent: true,
            displayOnMessageSide: true,
          },
        },
        questionBar: {
          clearTypedCharsOnSubmit: false,
          clearHistory: {
            display: false,
          },
          submit: {
            icon: "bi bi-search",
          },
        },
      },
      wording: {
        messages: {
          message: {
            header: {
              labelUser: "You",
              labelBot: "The bot",
            },
            footnotes: {
              showMoreLink: "More",
            },
          },
        },
        questionBar: {
          input: {
            placeholder: "Ask your question to the bot",
          },
        },
      },
    },
    styling: {
      "--tvk_base_box-shadow": "0px 6px 6px 0px #0000001a",
      "--tvk_base_font-size": "0.9em",
      "--tvk_base_radius": "20px",
      "--tvk_colors_brand-hue": "358",
      "--tvk_colors_brand-lightness": "54%",
      "--tvk_colors_brand-saturation": "74%",
      "--tvk_colors_dark_background": "transparent",
      "--tvk_colors_light_background": "transparent",
      "--tvk_colors_dark_surface2": "hsl(var(--tvk_colors_brand-hue) 3% 15%)",
      "--tvk_colors_light_surface2": "hsl(var(--tvk_colors_brand-hue) 10% 97%)",
      "--tvk_footnotes_align-items": "start",
      "--tvk_footnotes_flex-direction": "column",
      "--tvk_footnotes_font-size": "0.8rem",
      "--tvk_footnotes_footnote_background": "var(--tvk_colors_surface2)",
      "--tvk_footnotes_footnote_border": "1px solid var(--tvk_colors_neutral)",
      "--tvk_footnotes_footnote_border-radius": "var(--tvk_base_radius)",
      "--tvk_footnotes_footnote_content_font-style": "italic",
      "--tvk_footnotes_footnote_content_margin": "0 0 1em 0",
      "--tvk_footnotes_footnote_flex-direction": "column-reverse",
      "--tvk_footnotes_footnote_line-height": "1.2",
      "--tvk_footnotes_footnote_padding": "1em",
      "--tvk_footnotes_footnote_title_font-size": "0.9rem",
      "--tvk_footnotes_footnote_title_font-weight": "bold",
      "--tvk_footnotes_margin": "0",
      "--tvk_footnotes_sources-title_display": "none",
      "--tvk_message_answer_flex-basis-base": "50%",
      "--tvk_message_body_border": "1px solid var(--tvk_colors_neutral)",
      "--tvk_message_body_bot_radius-top-left":
        "var(--tvk_message_body_radius)",
      "--tvk_message_body_grow": "initial",
      "--tvk_message_body_padding": "2em 1em",
      "--tvk_message_gap": "2em",
      "--tvk_message_user_margin": "1em 0",
      "--tvk_messages_overflow": "visible",
      "--tvk_messages_padding": "0",
      "--tvk_question_border": "1px solid var(--tvk_colors_neutral)",
      "--tvk_question_box-shadow": "none",
      "--tvk_question_chars-count_display": "none",
      "--tvk_question_margin": "0em",
      "--tvk_question_padding": "0.5em",
      "--tvk_question_radius": "5px",
      "--tvk_side-footnotes_flex-basis-base": "50%",
      "--tvk_wrapper_flex-direction": "column-reverse",
      "--tvk_wrapper_gap": "1em",
      "--tvk_wrapper_links_text-decoration": "underline black",
      "--tvk_wrapper_max-height": "auto",
      "--tvk_wrapper_padding": "0em",
    },
  },
];
