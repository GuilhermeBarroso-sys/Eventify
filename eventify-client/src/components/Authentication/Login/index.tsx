"use client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { supabase } from "@/supabase";
import { setDocumentCookie } from "@/utils/clientCookies";
import {  useRouter } from "next/navigation";
import { api } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";
import { apiErrorHandler } from "@/utils/apiErrorHandler";
type IUserSignInData = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  }
}
export function Login() {
	const {toast} = useToast();
	const route = useRouter();
	const formSchema = z.object({
		email: z.string().email(),
		password: z.string().min(4)
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: ""
		},
	});
	async function signInWithGitHub() {
		await supabase.auth.signInWithOAuth({
			provider: "github",
			options: {
				redirectTo: "http://localhost:3001/login"
			}
		});    
	}
	async function isAuthenticatedByOAuth() {
		const {data, error} = await supabase.auth.getSession();
		if(data.session?.access_token) {
			try {
				const user = await api.post("/users/signin", {
					isSSO: true,
					ssoToken:  data.session?.access_token
				});
				setDocumentCookie("session", user.data.token);
				route.push("/");
			} catch(err) {}
		}


	}
	useEffect(() => {
		isAuthenticatedByOAuth();
	},[]);
	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const response = await api.post<IUserSignInData>("users/signin", {
				email: values.email,
				password: values.password,
			});
			setDocumentCookie("session", response.data.token);
			route.push("/");
			route.refresh();
		} catch(err : any) {
			toast({
				title: "Error",
				description: apiErrorHandler(err),
				variant: "destructive",
				duration: 3000
			});
		}  
	}
	
	return (
		
		<Card className="w-full max-w-[400px] mx-auto ">

			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl">Login</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-4">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full ">
        
						<div className="grid gap-2">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input  id="email" type="email" placeholder="user@example.com"  {...field} />
										</FormControl>
										<FormDescription>
               
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>	
						<div className="grid gap-2">
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input  id="password" type="password"   {...field} />
										</FormControl>
										<FormDescription>
                
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button className="w-full">Create account</Button>
						</div>
					</form>
				</Form>
				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<span className="w-full border-t" />
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-background px-2 text-muted-foreground">
            Or continue with
						</span>
					</div>
				</div>
	
				<Button type="button" variant="outline" onClick={signInWithGitHub}>
					<Icons.gitHub className="mr-2 h-4 w-4" />
          Github
				</Button>
			</CardContent>

		</Card>
				

		
	);
}