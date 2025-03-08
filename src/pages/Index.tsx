
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("login");
  const [mounted, setMounted] = useState(false);

  // Form states
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ name: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // API integration would go here
      toast({
        title: "Success",
        description: "You've been logged in successfully",
      });
      
      // Reset form
      setLoginForm({ email: "", password: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupForm.name || !signupForm.email || !signupForm.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // API integration would go here
      toast({
        title: "Account created",
        description: "Your account has been created successfully",
      });
      
      // Reset form and switch to login
      setSignupForm({ name: "", email: "", password: "" });
      setActiveTab("login");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSignupInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupForm(prev => ({ ...prev, [name]: value }));
  };

  if (!mounted) {
    return null; // Prevent flash of unstyled content
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-slate-900 -z-10" />
      
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-200 dark:bg-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-40 -right-40 w-80 h-80 bg-purple-200 dark:bg-purple-900/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-pink-200 dark:bg-pink-900/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      {/* Theme toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Logo and branding */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-2">
          <Mail className="w-8 h-8 text-primary mr-2" />
          <h1 className="text-3xl font-bold tracking-tight">Inboox</h1>
        </div>
        <p className="text-muted-foreground animate-fade-in">Manage your emails with ease</p>
      </div>

      {/* Auth card */}
      <Card className="w-full max-w-md glass-card animate-scale-in shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold text-center">
            {activeTab === "login" ? "Welcome back" : "Create an account"}
          </CardTitle>
          <CardDescription className="text-center">
            {activeTab === "login" 
              ? "Enter your email to sign in to your account" 
              : "Enter your details below to create your account"}
          </CardDescription>
        </CardHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">
                Sign up
              </TabsTrigger>
            </TabsList>
          </div>

          <CardContent>
            <TabsContent value="login" className="animate-fade-in">
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-sm font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input 
                      id="login-email"
                      name="email"
                      type="email" 
                      placeholder="name@example.com"
                      className="pl-10"
                      value={loginForm.email}
                      onChange={handleLoginInput}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password" className="text-sm font-medium">Password</Label>
                    <a href="#" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input 
                      id="login-password"
                      name="password"
                      type="password" 
                      placeholder="••••••••"
                      className="pl-10"
                      value={loginForm.password}
                      onChange={handleLoginInput}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full group" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Signing in..."
                  ) : (
                    <>
                      Sign in
                      <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="animate-fade-in">
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-sm font-medium">Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input 
                      id="signup-name"
                      name="name"
                      type="text" 
                      placeholder="John Doe"
                      className="pl-10"
                      value={signupForm.name}
                      onChange={handleSignupInput}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-sm font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input 
                      id="signup-email"
                      name="email"
                      type="email" 
                      placeholder="name@example.com"
                      className="pl-10"
                      value={signupForm.email}
                      onChange={handleSignupInput}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input 
                      id="signup-password"
                      name="password"
                      type="password" 
                      placeholder="••••••••"
                      className="pl-10"
                      value={signupForm.password}
                      onChange={handleSignupInput}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full group" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Creating account..."
                  ) : (
                    <>
                      Create account
                      <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
          </CardContent>
        </Tabs>

        <CardFooter className="flex flex-col space-y-4 px-6 pb-6 pt-0">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="hover:bg-secondary transition-colors">
              Google
            </Button>
            <Button variant="outline" className="hover:bg-secondary transition-colors">
              Apple
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Footer */}
      <p className="mt-8 text-center text-sm text-muted-foreground animate-fade-in">
        By using Inboox, you agree to our <a href="#" className="underline underline-offset-4 hover:text-primary">Terms of Service</a> and <a href="#" className="underline underline-offset-4 hover:text-primary">Privacy Policy</a>.
      </p>
    </div>
  );
};

export default Index;
