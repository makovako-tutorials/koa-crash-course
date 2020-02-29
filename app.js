const Koa = require('koa')
const json = require('koa-json') // prettifies json
const KoaRouter = require('koa-router')
const path = require('path')
const render = require('koa-ejs')
const bodyParser = require('koa-bodyparser')

const app = new Koa();
const router = new KoaRouter();

const THINGS = [
    'Lala',
    'lele',
    'lolo'
]

// app.use(async ctx => ctx.body = 'Hello World')

// JSON pretty middleware
app.use(json())

// Body parser middleware
app.use(bodyParser())

// Add additional properties to context

app.context.user = 'User'

// Simple middleware
// app.use(async ctx => ctx.body = {msg: "Hello World"})

// EJS middleware
render(app, {
    root: path.join(__dirname,'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug:false
})

// Routes

router.get('/',index);
router.get('/add', showAdd);
router.post('/add', add)

// List of things

async function index(ctx) {
    await ctx.render('index', {
        title: 'Things I Love:',
        things: THINGS
    })
}

// Show add page
async function showAdd(ctx) {
    await ctx.render('add')
}

// Add thing

async function add(ctx) {
    const body = ctx.request.body
    console.log(body);
    
    THINGS.push(body.thing)
    ctx.redirect('/')
}


// Index
// Passing some data to template
// router.get('/', async ctx => {
//     await ctx.render('index', {
//         title: 'Things I Love:',
//         things: THINGS
//     })
// })

router.get('/test', ctx => (ctx.body = `Hello ${ctx.user}`))
router.get('/test2/:name', ctx => (ctx.body = `Hello ${ctx.params.name}`))

// Router Middleware
app
  .use(router.routes())
  .use(router.allowedMethods())


app.listen(3000, () => {
    console.log(`Server started...`);
    
})