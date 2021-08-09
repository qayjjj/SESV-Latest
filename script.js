

const proxy = 'https://api.allorigins.win/raw?url='
const url = 'https://www.sesvtutorial.com/tutorials'
const button = document.querySelector("button")

// Extract tutorials
const displayHTML = (content) => {
    const startIndex = content.search('<section class="posts ">')
    const endIndex = content.search('</section>')
    content = content.slice(startIndex, endIndex + 10)
    content = content.replace('href="/', 'href="https://www.sesvtutorial.com/')
    return content
}

// Extract styles
const displayStyle = (content) => {
    const startIndex = content.search('<style')
    const endIndex = content.search('</style>')
    let styles = content.slice(startIndex, endIndex + 8)
    return styles
}

// Fetch whole SESV page
const fetchSESV = async () => {
    try {
        const res = await fetch(proxy + url)
        let content = await res.text()
        let styles = displayStyle(content)
        content = displayHTML(content)
        content += styles
        console.log(content)
        document.getElementById("list").innerHTML = content
    } catch (err) {
        console.log(err)
    }
} 

button.addEventListener("click", () => {
    confirm("Do you want to fetch SESV's lastest tutorials?")
        && fetchSESV()
})

