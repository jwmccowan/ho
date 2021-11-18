import Link from "next/link";
import useLogout from "../../../hooks/use-logout";
import useSession from "../../../hooks/use-session";
import WithChildren from "../../../utils/prop-utils/with-children.interface";
import Button from "../../atoms/Button";
import Container from "../../atoms/Container";
import TextInput from "../../atoms/TextInput";
import Logo from "../../icons/Logo";

function LoginButton(): JSX.Element {
  return (
    <Link href="/login" passHref>
      <Button>Login</Button>
    </Link>
  );
}

function LogoutButton(): JSX.Element {
  const [logout, logoutLoading] = useLogout();
  return (
    <Button disabled={logoutLoading} onClick={logout}>
      Logout
    </Button>
  );
}

function TopNav() {
  const session = useSession();
  return (
    <nav className="w-full py-4">
      <Container>
        <div className="flex flex-row items-center">
          <ul className="flex flex-row items-center">
            <li>
              <Link href="/">
                <a>
                  <Logo className="text-green-400 rounded-xl" />
                </a>
              </Link>
            </li>
            <li className="ml-8">
              <Link href="/profile">Profile</Link>
            </li>
          </ul>
          <TextInput className="mx-16" placeholder="Search events..." />
          {session && <LogoutButton />}
          {!session && <LoginButton />}
        </div>
      </Container>
    </nav>
  );
}

export interface LayoutProps extends WithChildren {}

export default function Layout(props: LayoutProps): JSX.Element {
  return (
    <div className="flex min-h-screen fill-current">
      <div className="flex-grow">
        <TopNav />
        <main>{props.children}</main>
      </div>
    </div>
  );
}
