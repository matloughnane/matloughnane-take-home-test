import { useContext, useState } from "react";
import { AuthContext } from "@/lib/contexts/auth-context";
import { AlertCircleIcon, Loader } from "lucide-react";
import { VersionToggle } from "@/components/version/version-toggle";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

export default function ExactLoginPage() {
  const { isUserLoading, login, useExactVersion } = useContext(AuthContext);
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
      // IF TRUE - NAVIGATE TO DASHBOARD
      if (useExactVersion) {
        navigate("/exact/hierarchy");
      } else {
        navigate("/hierarchy");
      }
    } else {
      setError(
        "Your username or password have not been recognised. Please try again."
      );
    }
  };

  return (
    <main className="sm:w-full mx-auto flex flex-col items-center justify-center py-12">
      {isUserLoading ? (
        <div className="py-8">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <div className="text-left">
          <h1 className="pb-8 py-4 text-xl font-semibold">Please Login</h1>
          <Card className="w-xl mx-auto rounded-none border-primary p-8">
            <Form {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-row">
                      <FormLabel className="flex-1 text-right justify-end">
                        email address:
                      </FormLabel>
                      <FormControl className="flex-2">
                        <Input
                          placeholder="your-email@gong.io"
                          className="rounded-none border border-primary py-0"
                          {...field}
                        />
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
                    <FormItem className="flex flex-row">
                      <FormLabel className="flex-1 text-right justify-end">
                        password:
                      </FormLabel>{" "}
                      <FormControl className="flex-2">
                        <Input
                          placeholder="**************"
                          type="password"
                          className="rounded-none border border-primary py-0"
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
                  <Button
                    className="px-12 py-1 text-black bg-[#812ac1]"
                    size={"lg"}
                    type="submit"
                  >
                    {isUserLoading ? <Loader /> : "Login"}
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
        </div>
      )}
      <div className="flex flex-row justify-between py-4">
        <VersionToggle page={"login"} />
      </div>
    </main>
  );
}
