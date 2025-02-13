import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface ContentItem {
  type: 'paragraph' | 'link';
  content: string;
}

export interface PostType {
  id: number;
  author: Author;
  content: ContentItem[];
  publishedAt: Date;
}

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const [comments, setComments] = useState(['Muito bom hein cara!']);
  const [newComment, setNewComment] = useState('');
  
  function handleCreateNewPost(event: FormEvent) {
    event.preventDefault();
    setComments([...comments, newComment]);
    setNewComment('');
  }

  function handleCreateNewComment(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setNewComment(event.target.value);
  }

  function deleteComment(commentToDelete: string) {
    setComments(comments.filter(comment => comment !== commentToDelete));
  }
  
  function handleInvalidNewComment(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Por favor, preencha o campo de comentário.');
  }

  const publishedAtFormatted = format(post.publishedAt, "dd 'de' LLLL 'às' HH:mm'h'", { 
    locale: ptBR 
  });
  const publishedTimeDistance = formatDistanceToNow(post.publishedAt, { 
      addSuffix: true,
      locale: ptBR 
  });
  
  const isEmptyNewComment = newComment.length === 0;
  
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>
        <time 
          title={publishedAtFormatted}
          dateTime={post.publishedAt.toISOString()}
        >
          {publishedTimeDistance}
        </time>
      </header>
      
      <div className={styles.content}>
        {
          post.content.map((item, index) => {
            if (item.type === 'paragraph') {
              return <p key={index}>{item.content}</p>
            } else if (item.type === 'link') {
              return <a key={index} href='#'>{item.content}</a>
            }
          })
        }
      </div>
      
      <form onSubmit={handleCreateNewPost} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea 
          placeholder="Deixe um comentário..."
          onChange={handleCreateNewComment}
          onInvalid={handleInvalidNewComment}
          value={newComment}
          required
        />
        <footer>
          <button type="submit" disabled={isEmptyNewComment}>Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => (
          <Comment key={comment} content={comment} onDeleteComment={deleteComment} />
        ))}
      </div>
    </article>
  )
}