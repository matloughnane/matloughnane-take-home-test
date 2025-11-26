import { Card } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertCircleIcon, Loader } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { AuthContext } from "@/lib/contexts/auth-context";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";

export function LoginForm() {
  const { isUserLoading, login } = useContext(AuthContext);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const loginFormSchema = z.object({
    email: z.email().min(2, {
      message: "Email must be at least 2 characters long.",
    }),
    password: z.string().min(2, {
      message: "Your password must be at least 2 characters long.",
    }),
  });

  // LOGIN FORM
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    setError("");
    // LOGIN USING AUTH CONTEXT
    const loginResult = await login(values.email, values.password);
    if (loginResult) {
      // console.log(loginResult);
      // IF TRUE - NAVIGATE TO DASHBOARD
      navigate("/hierarchy");
    } else {
      setError(
        "Your username or password have not been recognised. Please try again."
      );
    }
  };

  return (
    <div className="text-center">
      <h1 className="pb-8 py-4 text-xl font-semibold">Please Login</h1>
      <Card className="w-3xl mx-auto p-8">
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="your-email@gong.io" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* TODO: ADD A SHOW / HIDE FEATURE ON PASSWORD */}
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="**************"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row justify-end items-center gap-8">
              {error !== "" && (
                <Alert variant={"destructive"} className="py-2">
                  <AlertCircleIcon />
                  <AlertTitle>{error}</AlertTitle>
                </Alert>
              )}
              <Button className="px-12" size={"lg"} type="submit">
                {isUserLoading ? <Loader /> : "Login"}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
