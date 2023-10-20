import { PencilLine } from "phosphor-react";
import { Avatar } from "./Avatar";

import style from "./SideBar.module.css";
import imgProfile from "../assets/Lucas_Rodrigues.jpg";

export function SideBar() {
  return (
    <aside className={style.sidebar}>
      <img
        className={style.cover}
        src="https://images.unsplash.com/photo-1604964432806-254d07c11f32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8RGV2ZWxvcGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=40"
      />

      <div className={style.profile}>
        <Avatar src={imgProfile} />
        <strong>Lucas Rodrigues</strong>
        <span>Web Developer</span>
      </div>

      <footer>
        <a href="#">
          <PencilLine size={20} />
          Editar seu perfil
        </a>
      </footer>
    </aside>
  );
}
