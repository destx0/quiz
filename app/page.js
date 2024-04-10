"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { collection, getDocs } from "firebase/firestore";
import db from "@/services/firebase-config";

const TestSection = () => {
	const [fullTests, setFullTests] = useState([]);
	const [mixTests, setMixTests] = useState([]);
	const [topicwiseTests, setTopicwiseTests] = useState([]);

	useEffect(() => {
		const fetchTests = async () => {
			try {
				const fullSnapshot = await getDocs(collection(db, "full"));
				const mixSnapshot = await getDocs(collection(db, "mix"));
				const topicwiseSnapshot = await getDocs(
					collection(db, "topicwise")
				);

				const fullData = fullSnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				const mixData = mixSnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				const topicwiseData = topicwiseSnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));

				setFullTests(fullData);
				setMixTests(mixData);
				setTopicwiseTests(topicwiseData);
			} catch (error) {
				console.error("Error fetching tests:", error);
			}
		};
		fetchTests();
	}, []);

	return (
		<div>
			<section className="mb-8">
				<h2 className="text-2xl font-bold mb-4">Full Tests</h2>
				<Carousel className="w-full max-w-sm">
					<CarouselContent className="-ml-1">
						{fullTests.map((test) => (
							<CarouselItem
								key={test.id}
								className="pl-1 md:basis-1/2 lg:basis-1/3"
							>
								<div className="p-1">
									<Card>
										<CardContent className="flex aspect-square items-center justify-center p-6">
											<div>
												<CardTitle>
													{test.testName}
												</CardTitle>
												<p>
													Total Time: {test.totalTime}{" "}
													minutes
												</p>
												<p>
													Questions:{" "}
													{test.numQuestions}
												</p>
												<Button className="mt-4">
													Start Test
												</Button>
											</div>
										</CardContent>
									</Card>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</section>

			<section className="mb-8">
				<h2 className="text-2xl font-bold mb-4">Mix Tests</h2>
				<Carousel className="w-full max-w-sm">
					<CarouselContent className="-ml-1">
						{mixTests.map((test) => (
							<CarouselItem
								key={test.id}
								className="pl-1 md:basis-1/2 lg:basis-1/3"
							>
								<div className="p-1">
									<Card>
										<CardContent className="flex aspect-square items-center justify-center p-6">
											<div>
												<CardTitle>
													{test.testName}
												</CardTitle>
												<p>
													Total Time: {test.totalTime}{" "}
													minutes
												</p>
												<p>
													Questions:{" "}
													{test.numQuestions}
												</p>
												<Button className="mt-4">
													Start Test
												</Button>
											</div>
										</CardContent>
									</Card>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</section>

			<section>
				<h2 className="text-2xl font-bold mb-4">Topicwise Tests</h2>
				<Carousel className="w-full max-w-sm">
					<CarouselContent className="-ml-1">
						{topicwiseTests.map((test) => (
							<CarouselItem
								key={test.id}
								className="pl-1 md:basis-1/2 lg:basis-1/3"
							>
								<div className="p-1">
									<Card>
										<CardContent className="flex aspect-square items-center justify-center p-6">
											<div>
												<CardTitle>
													{test.testName}
												</CardTitle>
												<p>
													Total Time: {test.totalTime}{" "}
													minutes
												</p>
												<p>
													Questions:{" "}
													{test.numQuestions}
												</p>
												<Button className="mt-4">
													Start Test
												</Button>
											</div>
										</CardContent>
									</Card>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</section>
		</div>
	);
};

export default TestSection;
