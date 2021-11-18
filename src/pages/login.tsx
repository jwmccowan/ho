import Head from "next/head";
import { useState } from "react";
import useEmailLogin from "../hooks/use-email-login";
import useGoogleLogin from "../hooks/use-google-login";
import Container from "../components/atoms/Container";
import useSession from "../hooks/use-session";
import Layout from "../components/layouts/Layout";
import Button from "../components/atoms/Button";
import TextInput from "../components/atoms/TextInput";
import { useForm } from "react-hook-form";
import router from "next/router";

function Or(): JSX.Element {
  return (
    <div className="flex items-center w-full flex-row">
      <div className="bg-gray-400 flex-grow w-full" style={{ height: "1px" }} />
      <p className="text-md text-gray-400 p-4">OR</p>
      <div className="bg-gray-400 flex-grow w-full" style={{ height: "1px" }} />
    </div>
  );
}

export default function LoginPage(): JSX.Element {
  const [googleLogin, googleLoading] = useGoogleLogin();
  const [emailLogin, emailLoading] = useEmailLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Layout>
        <div className="bg-green-300">
          <section>
            <Container>
              <div className="flex items-center justify-center h-screen">
                <div className="flex flex-col items-center px-16 py-16 bg-white rounded-xl elevation-8 drop-shadow-lg">
                  <h1 className="text-4xl mb-12">Sign up or sign in</h1>
                  <p className="mb-4">It might be easiest to...</p>
                  <Button
                    color={Button.color.google}
                    disabled={googleLoading}
                    onClick={googleLogin}
                  >
                    Log in with google
                  </Button>
                  <Or />
                  <p>Or you could log in or sign up with your email</p>
                  <p className="mb-4">No password required!</p>
                  <form
                    className="flex flex-col"
                    onSubmit={handleSubmit((values) =>
                      emailLogin(values.email)
                    )}
                    noValidate
                  >
                    {errors.email && (
                      <p className="text-red-600">{`* ${errors.email.message}`}</p>
                    )}
                    <TextInput
                      className="mb-8"
                      error={errors.email}
                      type="email"
                      placeholder="Your email"
                      {...register("email", {
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                        required: "Required",
                      })}
                    />
                    <Button
                      color={Button.color.default}
                      disabled={emailLoading}
                      type="submit"
                    >
                      Log in with email
                    </Button>
                  </form>
                </div>
              </div>
            </Container>
          </section>
        </div>
      </Layout>
    </>
  );
}
