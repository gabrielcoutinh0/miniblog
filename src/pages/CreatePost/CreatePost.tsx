// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import styles from "./CreatePost.module.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

import JoditEditor from "jodit-react";

export default function CreatePost() {
  const [keywords, setKeywords] = useState([]);
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

  const handdleAddTag = (tag: string) => {
    const trimmedInput = tag.trim().toLowerCase();

    if (tags.includes(trimmedInput) || inputTag === "") {
      setInputTag("");
    } else {
      setTags((prevState) => [...prevState, trimmedInput]);
      setInputTag("");
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<object>) => {
    const { key } = e;

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

  const createKeywords = (title: string) => {
    const curTitle = title.split(" ");
    const arrTitle = [];
    for (let i = 0; i < curTitle.length; i++) {
      for (let j = 1; j <= curTitle.length; j++) {
        const slice = curTitle.slice(i, j);
        if (slice.length) arrTitle.push(slice.join(" "));
      }
    }

    return arrTitle;
  };

  useEffect(() => {
    const titleLowCase = title.toLowerCase();
    setKeywords(createKeywords(titleLowCase));
  }, [title, inputTag]);

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

    insertDocument({
      keywords,
      title,
      image,
      body,
      tags,
      uid: user.uid,
      createdBy: user.displayName,
      resume,
    });

    navigate("/");
  };

  return (
    <div className={`content ${styles.create_post}`}>
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
          <JoditEditor
            className={styles.editor}
            value={body}
            onChange={setBody}
          />
          {/* <textarea
            name="body"
            required
            placeholder="Conteúdo do post..."
            onChange={(e) => setBody(e.target.value)}
            value={body}
          /> */}
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
          <div className={styles.addTag}>
            <input
              type="text"
              name="tags"
              id="inputTags"
              placeholder="Insira as tags separadas."
              onKeyDown={onKeyDown}
              onKeyUp={onKeyUp}
              onChange={(e) => setInputTag(e.target.value)}
              value={inputTag}
            />
            <span
              onClick={() => handdleAddTag(inputTag)}
              className="btn btn-dark"
            >
              + Add Tag
            </span>
          </div>
        </label>
        {response.loading ? (
          <button className="btn" disabled>
            Aguarde...
          </button>
        ) : (
          <button className="btn">Criar post!</button>
        )}

        {(response.error || formError) && (
          <p className="error">{response.error || formError}</p>
        )}
      </form>
    </div>
  );
}
