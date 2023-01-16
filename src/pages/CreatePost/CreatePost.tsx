// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [inputTag, setInputTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [resume, setResume] = useState("");
  const [formError, setFormError] = useState("");
  const [isKeyReleased, setIsKeyReleased] = useState(false);

  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument("posts");

  const navigate = useNavigate();

  const onKeyDown = (e: React.KeyboardEvent<object>) => {
    const { key } = e;
    const trimmedInput = inputTag.trim();

    if (key === "," && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInput]);
      setInputTag("");
    }

    if (key === "," && tags.includes(trimmedInput)) {
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

      console.log(typeof poppedTag);

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

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setFormError("");

    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL");
    }

    const tagsArray = tags.map((tag: string) => tag.toLowerCase());

    if (!title || !image || !tags || !body)
      setFormError("Por favor, preencha todos os campos!");

    if (formError) return;

    insertDocument({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
      resume,
    });

    navigate("/");
  };

  return (
    <div className={styles.create_post}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
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
              <div key={index} className={styles.tag}>
                {tag}
                <button onClick={() => deleteTag(index)}>x</button>
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
        {!response.loading && <button className="btn">Criar post!</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {(response.error || formError) && (
          <p className="error">{response.error || formError}</p>
        )}
      </form>
    </div>
  );
}
