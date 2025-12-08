// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: "LayerNext Documentation",
    tagline: "Best in class Data Tools for Computer Vision",
    url: "https://docs.layernext.ai",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon.ico",
    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    // organizationName: "LayerX-AI", // Usually your GitHub org/user name.
    // projectName: "layernext", // Usually your repo name.

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: "en",
        locales: ["en"],
    },

    presets: [
        [
            "classic",
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    routeBasePath: "/",
                    sidebarPath: require.resolve("./sidebars.js"),
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    // editUrl:
                    //     "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
                },
                blog: false,
                theme: {
                    customCss: require.resolve("./src/css/custom.css"),
                },
            }),
        ],
        [
            "redocusaurus",
            {
                // Plugin Options for loading OpenAPI files
                specs: [
                    {
                        id: "dataset-openapi",
                        spec: "openapi/dataset-openapi.json",
                        route: "/dataset/",
                    },
                    {
                        id: "project-openapi",
                        spec: "openapi/project-data-openapi.json",
                        route: "/project/",
                    },
                ],
                // // Theme Options for modifying how redoc renders them
                theme: {
                    // Change with your site colors
                    primaryColor: "#7166f9",
                },
            },
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            metadata: [{ name: "robots", content: "noindex, nofollow" }, { name: 'google-site-verification', content: 'EpNKhXeCsbpaHYAyxQdXYnCGmfAX5UXN3402SWekAbY', }],
            colorMode: {
                defaultMode: "dark",
            },
            navbar: {
                title: "LayerNext Docs",
                logo: {
                    alt: "LayerNext Docs",
                    src: "img/logo.svg",
                },
                items: [
                    {
                        href: "https://www.layernext.ai",
                        label: "Back to LayerNext",
                        position: "right",
                    },
                    // {
                    //     href: "https://github.com/facebook/docusaurus",
                    //     label: "GitHub",
                    //     position: "right",
                    // },
                ],
            },
            footer: {
                copyright: `Copyright © ${new Date().getFullYear()} LayerNext, Inc.`,
            },
            // {
            // style: "dark",
            // links: [
            //     {
            //         title: "Docs",
            //         items: [
            //             {
            //                 label: "Tutorial",
            //                 to: "/docs/intro",
            //             },
            //         ],
            //     },
            //     {
            //         title: "Community",
            //         items: [
            //             {
            //                 label: "Stack Overflow",
            //                 href: "https://stackoverflow.com/questions/tagged/docusaurus",
            //             },
            //             {
            //                 label: "Discord",
            //                 href: "https://discordapp.com/invite/docusaurus",
            //             },
            //             {
            //                 label: "Twitter",
            //                 href: "https://twitter.com/docusaurus",
            //             },
            //         ],
            //     },
            //     {
            //         title: "More",
            //         items: [
            //             {
            //                 label: "Blog",
            //                 to: "/blog",
            //             },
            //             {
            //                 label: "GitHub",
            //                 href: "https://github.com/facebook/docusaurus",
            //             },
            //         ],
            //     },
            // ],
            // copyright: `Copyright © ${new Date().getFullYear()} LayerNext, Inc.`,
            // },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),
};

module.exports = config;