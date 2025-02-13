import { Header } from './components/Header';
import { Post, PostType } from './components/Post';
import { Sidebar } from './components/Sidebar';

import styles from './App.module.css';
import './global.css';



const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://i.pravatar.cc/150?img=69',
      name: 'Ailton Oliveira',
      role: 'Software Engineer'
    },
    content: [
      { type: 'paragraph', content: 'Fala galera!' },
      { type: 'link', content: 'jane.design/doctorcare' },
    ],
    publishedAt: new Date('2025-02-12 08:36:00')
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://i.pravatar.cc/150?img=22',
      name: 'Fabiana Lacerda',
      role: 'CTO PDigital'
    },
    content: [
      { type: 'paragraph', content: 'Fala galerinha!' },
      { type: 'link', content: 'jane.design/doctorcare' },
    ],
    publishedAt: new Date('2025-02-12 09:36:00')
  },
]
  

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => (
            <Post 
              key={post.id}
              post={post}
            />
          ))}
        </main>
      </div>
    </div>
  )
}