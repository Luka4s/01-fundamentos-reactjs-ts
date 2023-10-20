import style from "./Post.module.css";

import { Comment } from "./Comment";
import { Avatar } from "./Avatar";

import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

interface Author {
  nome: string;
  role: string;
  avatarUrl: string;
}

interface ObjContent {
  type: "paragraph" | "Link";
  content: string;
}

export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: ObjContent[];
}

interface Postprops {
  post: PostType;
}

export function Post({ post }: Postprops) {
  const [comments, setComments] = useState(["Primeira Renderização"]);

  const [newCommentText, setNewCommentText] = useState("");

  console.log(newCommentText);

  const publishedDateFormatted = format(
    post.publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  const publishedDateRelativeNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });
  //Criar novo comentário
  function HandleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    setComments([...comments, newCommentText]);
    setNewCommentText("");
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event?.target.setCustomValidity("");
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event?.target.setCustomValidity("Esse Campo é obrigatório");
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeleteOne = comments.filter((comment) => {
      return comment != commentToDelete;
    });

    setComments(commentsWithoutDeleteOne);
  }

  const isNewCommentEmpyt = newCommentText.length === 0;

  return (
    <article className={style.post}>
      <header>
        <div className={style.author}>
          <Avatar src={post.author.avatarUrl} />
          <div className={style.authorInfo}>
            <strong>{post.author.nome}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime="2023-07-05 18:52:50">
          {publishedDateRelativeNow}
        </time>
      </header>

      <div className={style.content}>
        {post.content.map((Line) => {
          if (Line.type === "paragraph") {
            return <p key={Line.content}>{Line.content}</p>;
          } else if (Line.type === "Link") {
            return (
              <p key={Line.content}>
                <a href="">{Line.content}</a>
              </p>
            );
          }
        })}
      </div>

      <form onSubmit={HandleCreateNewComment} className={style.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name="comment"
          placeholder="Deixe seu comentário"
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button type="submit" disabled={isNewCommentEmpyt}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={style.commentList}>
        {comments.map((comments) => {
          return (
            <Comment
              key={comments}
              content={comments}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
