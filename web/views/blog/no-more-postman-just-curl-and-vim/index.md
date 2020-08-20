---
slug: 'no-more-postman-just-curl-and-vim'
title: 'No More postman just use cUrl + vim = ❤'
date: '2020-08-20'
author: 'Mahmoud Ashraf'
description: 'Well documented api and easy to use and share with your team with simple tools cUrl + vim + git (optional)'
categories:
  - 'api'
  - 'tooling'
  - 'curl'
  - 'vim'
---

<img 
  src="./bg.jpg" 
  sizes='(min-width: 1024px) 1024px, 100vw'
  srcSet="./bg.jpg?size=320 320w, ./bg.jpg?size=640 640w, 
    ./bg.jpg?size=960 960w, ./bg.jpg?size=1200 1200w, ./bg.jpg?size=1800 1800w, ./bg.jpg?size=2400 2400w"  
  alt="big brain with vim and cUrl logos">

Postman one of the most popular API client tool, for send and view the response
in the development environment. But since Postman is proprietary software and 
there is a free + open sourced alternative so I'll go for something 
like insomnia, or postwoman. 

But also I'll go for CLI if exists and cUrl is one of 
the easy to use and fully featured tool and in this article I'll show you how
to setup a well-documented api with cUrl + vim + git.

### How to execute CLI inside your vim editor? 

vim is very powerful editor and you can execute an command line
inside it. go to command mode and insert `:! <command>` and hit enter.

for example: 

```vim
  :! ls
```

will execute the `ls` command line and show the content 
in pager.

<img 
  src="./screen.jpg" 
  sizes='(min-width: 1024px) 1024px, 100vw'
  srcSet="./screen.jpg?size=320 320w, ./screen.jpg?size=640 640w, 
    ./screen.jpg?size=960 960w, ./screen.jpg?size=1200 1200w, ./screen.jpg?size=1800 1800w, ./screen.jpg?size=2400 2400w"  
  loading="lazy" alt="screenshot for ls command inside vim">


### Execute the content of the current file as CLI.

open an empty file inside your vim and write inside it `echo Hello, World!` and save it,
and then write `:!sh %`. 

The percent `%` will take whatever inside current buffer and execute it in a pager.

<img 
  src="./screen1.jpg" 
  sizes='(min-width: 1024px) 1024px, 100vw'
  srcSet="./screen1.jpg?size=320 320w, ./screen1.jpg?size=640 640w, 
    ./screen1.jpg?size=960 960w, ./screen1.jpg?size=1200 1200w, ./screen1.jpg?size=1800 1800w, ./screen1.jpg?size=2400 2400w"  
  loading="lazy" alt="screenshot :!sh command inside vim">

### Test our first cUrl command

for demonstrating we will gonna use [jsonplaceholder](https://jsonplaceholder.typicode.com/) as our API to test

and create a folder structure like below:

```sh
└── api
    └── todos
        ├── delete
        │   └── todo.zsh
        ├── get
        │   ├── todo-by-user.sh
        │   ├── todo.sh
        │   └── todos.sh
        ├── patch
        │   └── todo.sh
        ├── post
        │   └── todo.sh
        └── put
            └── todo.sh
```

`.sh`  to get file highlighted.

let's start with first and simple one `api/posts/get/todos.sh`.

write in the file  and save.

```sh
curl -s -X GET \
	'https://jsonplaceholder.typicode.com/todos'
```
then as we done before run `:!sh %`

<img 
  src="./screen2.jpg" 
  sizes='(min-width: 1024px) 1024px, 100vw'
  srcSet="./screen2.jpg?size=320 320w, ./screen2.jpg?size=640 640w, 
    ./screen2.jpg?size=960 960w, ./screen2.jpg?size=1200 1200w, ./screen2.jpg?size=1800 1800w, ./screen2.jpg?size=2400 2400w"  
  loading="lazy"
  alt="screenshot of :!sh % result inside vim">

# Make the result More Handy.

In most tools you will get a split view for the request itself 
and the result.

open you vim config file and add

```vim
command Exec set splitright | vnew | set filetype=sh | read !sh #
```

the command before will open the result in a new buffer in vertical view.

if you prefer horizontal view you can change the command to 

```vim
command Exec set splitbelow | new | set filetype=sh | read !sh #
```

open again `api/posts/get/todos.sh` and  in command mode write `:Exec`
that will execute the command inside the file and open split view with the result.

<img 
  src="./screen3.jpg" 
  sizes='(min-width: 1024px) 1024px, 100vw'
  srcSet="./screen3.jpg?size=320 320w, ./screen3.jpg?size=640 640w, 
    ./screen3.jpg?size=960 960w, ./screen3.jpg?size=1200 1200w, ./screen3.jpg?size=1800 1800w, ./screen3.jpg?size=2400 2400w"  
  loading="lazy"
  alt="screenshot of before vim command">

now you have vim buffer you can easily search and do whatever you do. and to close the buffer you can use
command ``:bd!`` or the keyboard shortcut `shift + z + q`.


### Is cUrl limited?

The answer is **NO**.
let's see couple of example

- POST Request:

```sh
curl -s -X POST \
	'https://jsonplaceholder.typicode.com/posts' \
	-H 'Content-Type: application/json' \
	-d '{ "title": "fooBatch", "completed": false, "userId": 1 }' \
```
 you can make post, get, put, .. or any http request by using `-X <REQUEST_TYPE>` option.

 To pass the body data use `-d, --data {json format>}` , and if the data is large 
 you can write it in `json` file and pass it as `-d @todo.json`

 - GET Request with query params:

```sh
curl -s -X GET -G \
	'https://jsonplaceholder.typicode.com/todos' \
	-d 'userId=1'
```

you can still use query params with `-d` but add an additional `-G, --get` to pass it as query params

since this is not a cUrl tutorial that's will be enough and you 
can learn more about advanced stuff like set header, cookie and more from the internet.

### Using git?

Of course, on our created directory run `git init` and push for example to github.

[see this example on github](https://github.com/22mahmoud/vim-curl-demo)

### Conclusion

You can now write a well-documented api and share it with your friends via git
all that done with simple and open-sourced tools and that's not limited to cUrl
you can write you own scripts and run it inside vim, or pipe cUrl command for anther 
tools to manipulate the output for example `jq` so you can filter your output.