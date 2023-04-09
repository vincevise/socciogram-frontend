import React from 'react'
import { selectPosts } from '../features/postsSlice'
import { useSelector } from 'react-redux'
import { Oval } from 'react-loader-spinner'
import PostCard1 from './PostCard1'

const Posts = () => {

    const postState = useSelector(selectPosts)
    if(postState.loading){
        return (
            <div className="w-screen h-screen flex items-center justify-center">
              <Oval
                height={80}
                width={80}
                color="gray"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="white"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </div>
        )
    }

    // console.log(postState.posts, 'posts')

  return (
    <div className=' z-10 mx-auto'>
        {postState.posts.map((x)=> <PostCard1 data={x} key={x._id}/>)}
    </div>
    )
}

export default Posts