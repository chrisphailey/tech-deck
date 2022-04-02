
async function postFormHandler(event) {
    event.preventDefault();

    const contents = document.querySelector('#post-content').value.trim()
    const title = document.querySelector('#post-title').value.trim()
    const post_url = document.querySelector('#post-url').value.trim()

    if(contents && title){
        console.log('connected')
        const response = await fetch('/api/posts/', {
            method: 'POST',
            body: JSON.stringify({
                title,
                contents,
                post_url,
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        if(response.ok){
            console.log(response)
            response.json(data => {
                console.log(data)
            })
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('#submit-post').addEventListener('click', postFormHandler)