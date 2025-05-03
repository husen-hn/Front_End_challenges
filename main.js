class Projects {
    constructor() {
        this.projectContainer = document.querySelector('#project-container')
        this.pureJSProjectContainer = document.querySelector(
            '#pure-js-project-container'
        )

        this.projects = [
            {
                title: 'SPA Project',
                url: './spa-project/index.html',
                technologies: 'html css js'
            },
            ,
            {
                title: 'Juice Shopping Store',
                url: './juice-shopping-store/index.html',
                technologies: 'html css js'
            },
            {
                title: 'Country Guide App',
                url: './country-guide/index.html',
                technologies: 'html css js'
            },
            {
                title: 'Tailwind Sandbox',
                url: './tailwind-sandbox/index.html',
                technologies: 'html css js tailwindcss'
            },
            {
                title: 'Tailwind CSS Mini Projects',
                url: './tailwind-course-projects/mini-projects/index.html',
                technologies: 'html css js tailwindcss'
            },
            {
                title: 'Tailwind CSS Projects',
                url: './tailwind-course-projects/website-projects/index.html',
                technologies: 'html css js tailwindcss'
            },
            {
                title: 'JavaScript Simplified/Advanced',
                url: './javascript-simplified/index.html',
                technologies: 'html css js'
            },
            {
                title: 'React first steps',
                url: './react-first-steps/index.html',
                technologies: 'html css js react'
            }
        ]

        this.pureJSProjects = [
            {
                title: 'Shopping Cart',
                url: './shopping-cart/index.html',
                technologies: 'html css js'
            },
            {
                title: 'Simple Calculator',
                url: './simple-calculator/index.html',
                technologies: 'html css js'
            }
        ]
    }

    display() {
        this.projects.map((project) => {
            this.projectContainer.innerHTML += this.product(
                project.url,
                project.title,
                project.technologies
            )
        })

        this.pureJSProjects.map((project) => {
            this.pureJSProjectContainer.innerHTML += this.product(
                project.url,
                project.title,
                project.technologies
            )
        })
    }

    product(url, title, technologies) {
        let projectHTML = `
        <a href=${url} class="relative group border border-[#E95379] border-8 rounded-3xl">
            <div class="relative bg-white rounded-3xl">
                <iframe
                    src=${url}
                    id="serverurl"
                    class="w-72 h-52 rounded-3xl"
                ></iframe>
                <div
                    class="absolute bottom-0 left-0 right-0 top-0 bg-black opacity-0 rounded-3xl"
                ></div>
            </div>

            <div
                class="absolute bottom-0 left-0 right-0 p-2 px-4 duration-500 bg-[#232530] bg-opacity-90 text-[#21BFC2] opacity-0 group-hover:opacity-100 rounded-b-3xl"
            >
                <div class="flex flex-col items-start h-14 w-full">
                    <p class="font-bold">${title}</p>
                    <div class="flex flex-row space-x-3 mt-2">`
        if (technologies.includes('html')) {
            projectHTML += `
                    <img
                        src="./assets/html.png"
                        alt=""
                        class="w-5 h-5"
                    />`
        }
        if (technologies.includes('css')) {
            projectHTML += `
                    <img
                        src="./assets/css.png"
                        alt=""
                        class="w-5 h-5"
                    />`
        }
        if (technologies.includes('js')) {
            projectHTML += `
                    <img
                        src="./assets/js.png"
                        alt=""
                        class="w-5 h-5"
                    />`
        }
        if (technologies.includes('tailwindcss')) {
            projectHTML += `
                    <div class="h-5 border border-white"></div>
                    <img
                        src="./assets/tailwindcss.png"
                        alt=""
                        class="w-6 h-4"
                    />`
        }

        projectHTML += `
                    </div>
                </div>
            </div>
        </a>
        `

        return projectHTML
    }
}

const projects = new Projects()
projects.display()
