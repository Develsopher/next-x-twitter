"use client";
import { Hashtag } from "@/model/Hashtag";
import { useQuery } from "@tanstack/react-query";
import { getTrends } from "../../_lib/getTrends";
import Trend from "../../_component/Trend";

const TrendSection = () => {
  const { data } = useQuery<Hashtag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
  return data?.map((trend) => <Trend key={trend.tagId} trend={trend} />);
};

export default TrendSection;
