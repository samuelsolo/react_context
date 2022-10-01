import { createStore, action, thunk, computed} from 'easy-peasy'
import api from './api/post';

export default createStore({

    //statename: [],
    //statename: action()
    //statename: action(() => {})
    //statename: action((state, payload)=>{})
    posts: [],
    setPosts: action((state, payload) => {
        state.posts=payload;
    }),
    search: [],
    setSearch: action((state, payload) => {
        state.search=payload;
    }),
    searchResult: [],
    setSearchResult: action((state, payload) => {
        state.searchResult=payload;
    }),
    pTitle: [],
    setPTitle: action((state, payload) => {
        state.pTitle=payload;
    }),
    pBody: [],
    setPBody: action((state, payload) => {
        state.pBody=payload;
    }),
    eTitle: [],
    setETitle: action((state, payload) => {
        state.eTitle=payload;
    }),
    eBody: [],
    setEBody: action((state, payload) => {
        state.eBody=payload;
    }),

    // computed (() => {})
    // computed ((state) => {})
    postCount: computed(state => state.posts.length),

    getPostById: computed(state => {
        return (id => state.posts.find(post => post.id == id))
    }),

    savePost: thunk (async (actions, newPost, helpers) => {
        const {posts} = helpers.getState();
        try{
            const response = await api.post('/posts', newPost);
            
            actions.setPosts([...posts, response.data])
            actions.setPTitle('');
            actions.setPBody('');
          } catch(err){
            console.log(`Error: ${err.message}`);
          } 
    }),
    // thunk (async () => {})
    // thunk (async (actions, newPost, helpers) => { } )
    deletePost: thunk (async (actions, id, helpers) => {
        const {posts} = helpers.getState();
        try{
            await api.delete(`/posts/${id}`);

            actions.setPosts(posts.filter(post => post.id != id));
      
          }catch(err){
            console.log(err.message);
          }
    }),
    editPost: thunk (async (actions, newPost, helpers) => {
        const {posts} = helpers.getState();
        const {id} = newPost;
        try{
            const response = await api.put(`/posts/${id}`, newPost)
            actions.setPosts(posts.map(post => post.id == id ? ({...response.data}) : post))
            actions.setEBody('');
            actions.setETitle('')
          }
          catch(err){
            console.log(err.message)
          }
    }),
})