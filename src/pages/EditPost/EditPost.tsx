// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import styles from "./EditPost.module.css";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

import firebase from "firebase/firestore";

export default function EditPost() {
  const { id } = useParams();
  const { document: post }: firebase.DocumentData = useFetchDocument(
    "posts",
    id
  );

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [inputTag, setInputTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [resume, setResume] = useState("");
  const [formError, setFormError] = useState("");
  const [isKeyReleased, setIsKeyReleased] = useState(false);

  const onKeyDown = (e: React.KeyboardEvent<object>) => {
    const { key } = e;
    const trimmedInput = inputTag.trim().toLowerCase().replace(/\,/g, "");

    if (
      (e.target.value.endsWith(",") || key === ",") &&
      trimmedInput.length &&
      !tags.includes(trimmedInput)
    ) {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInput]);
      setInputTag("");
    }

    if (
      (e.target.value.endsWith(",") || key === ",") &&
      tags.includes(trimmedInput)
    ) {
      e.preventDefault();
      setInputTag("");
    }

    if (
      key === "Backspace" &&
      !inputTag.length &&
      tags.length &&
      isKeyReleased
    ) {
      e.preventDefault();
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();

      setTags(tagsCopy);
      setInputTag(poppedTag);
    }

    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  };

  const deleteTag = (index: number) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setResume(post.resume);
      setBody(post.body);
      setImage(post.image);
      setTags(post.tags);
    }
  }, [post]);

  const { user } = useAuthValue();
  const { updateDocument, response } = useUpdateDocument("posts");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setFormError("");

    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL");
    }

    if (!title || !image || !tags || !body)
      setFormError("Por favor, preencha todos os campos!");

    if (formError) return;

    const data = {
      title,
      image,
      body,
      tags,
      uid: user.uid,
      createdBy: user.displayName,
      resume,
    };

    updateDocument(id, data);

    navigate("/dashboard");
  };

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editando post: {post.title}</h2>
          <p>Altere os dados do post como desejar</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Título:</span>
              <input
                type="text"
                name="title"
                required
                placeholder="Título do post..."
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>
            <label>
              <span>Resumo:</span>
              <input
                type="text"
                name="resume"
                required
                placeholder="Título do post..."
                onChange={(e) => setResume(e.target.value)}
                value={resume}
              />
            </label>
            <label>
              <span>URL da imagem:</span>
              <input
                type="text"
                name="image"
                required
                placeholder="Imagem do post..."
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </label>
            <p>Preview da imagem atual:</p>
            <img
              className={styles.image_preview}
              src={post.image}
              alt={post.title}
            />
            <label>
              <span>Conteúdo:</span>
              <textarea
                name="body"
                required
                placeholder="Conteúdo do post..."
                onChange={(e) => setBody(e.target.value)}
                value={body}
              />
            </label>
            <label>
              <span>Tags:</span>
              <mark>
                Coloque a tag "destaque" para aparecer nos Destaques na página
                inicial
              </mark>
              <div className={styles.tags}>
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className={styles.tag}
                    onClick={() => deleteTag(index)}
                  >
                    {tag}
                    <span>x</span>
                  </div>
                ))}
              </div>
              <input
                type="text"
                name="tags"
                id="inputTags"
                placeholder="Insira as tags separadas por vírgula."
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
                onChange={(e) => setInputTag(e.target.value)}
                value={inputTag}
              />
            </label>
            {!response.loading && (
              <button type="submit" value="submit" className="btn">
                Editar
              </button>
            )}
            {response.loading && (
              <button className="btn" disabled>
                Aguarde...
              </button>
            )}
            {(response.error || formError) && (
              <p className="error">{response.error || formError}</p>
            )}
          </form>
        </>
      )}
    </div>
  );
}
