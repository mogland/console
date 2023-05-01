import styles from "@pages/Login/index.module.css";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import type { BasicPage } from "@type/basic";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@utils/request";
import { app } from "@states/app";
import { setCookie } from "@utils/cookie";
import { jump } from "@utils/path";
import { useSeo } from "@hooks/useSeo";
import { toast } from "sonner";
import useSWR from "swr";
import { useSnapshot } from "valtio";

export const RegisterPage: BasicPage = () => {
  useSeo("注册");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const appSnapshot = useSnapshot(app);

  const { error } = useSWR("/user/master/info");
  if (!error) {
    toast.error("已注册，正在前往登录页面");
    navigate(jump("/login"));
    app.showSidebar = false;
  }

  useEffect(() => {
    if (appSnapshot.authenticated) {
      toast.success("已登录，正在前往仪表盘");
      navigate(jump("/dashboard"));
      return;
    }
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = formRef.current;
    if (form) {
      const username = (form.elements.namedItem("username") as RadioNodeList)!
        .value;
      const password = (form.elements.namedItem("password") as RadioNodeList)!
        .value;
      const nickname = (form.elements.namedItem("nickname") as RadioNodeList)!
        .value;
      const description = (form.elements.namedItem(
        "description"
      ) as RadioNodeList)!.value;
      const email = (form.elements.namedItem("email") as RadioNodeList)!.value;
      const avatar = (form.elements.namedItem("avatar") as RadioNodeList)!
        .value;
      apiClient("/user/register", {
        method: "POST",
        body: {
          username,
          password,
          nickname,
          description,
          email,
          avatar,
        },
      })
        .then((res) => {
          setCookie("token", res.token);
          toast.success("登录成功, 欢迎回来");
          app.authenticated = true;
          navigate(jump("/dashboard"));
          window.location.reload();
        })
        .catch((res) => {
          toast.error(`登录失败 - ${res.data.message}`);
        });
    }
    setLoading(false);
  }

  return (
    <>
      <div className={clsx(styles.container)}>
        <div className={clsx(styles.title)}> 注册 </div>
        <div>
          <form
            ref={formRef}
            autoComplete="off"
            className={clsx(styles.form)}
            onSubmit={handleSubmit}
          >
            <input
              className={styles["form-input"]}
              type="text"
              name="username"
              placeholder="用户名"
              autoFocus
            />
            <input
              className={styles["form-input"]}
              type="password"
              name="password"
              placeholder="密码"
            />
            <input
              className={styles["form-input"]}
              type="text"
              name="nickname"
              placeholder="昵称"
            />
            <input
              className={styles["form-input"]}
              type="text"
              name="email"
              placeholder="邮箱"
            />
            <input
              className={styles["form-input"]}
              type="text"
              name="avatar"
              placeholder="头像"
            />
            <textarea
              className={clsx(styles["form-input"], styles["form-textarea"])}
              name="description"
              placeholder="个人简介"
            />
            <button className={clsx(styles["form-button"])} type="submit">
              <span className={clsx(loading && styles["form-loading"])}>
                注册
              </span>

              <motion.span
                className={clsx(
                  loading && styles["form-loading-circle"],
                  styles["form-circle"]
                )}
                animate={{
                  rotate: [0, 720],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                }}
                style={{
                  borderRadius: "100%",
                }}
              />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
