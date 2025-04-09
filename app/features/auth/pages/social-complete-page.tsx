import { useParams } from "react-router";
import { Button } from "~/common/components/ui/button";
export default function SocialCompletePage() {
  const { provider } = useParams<{ provider: string }>();

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">{provider} 로그인 완료</h1>
        <p className="text-gray-500 dark:text-gray-400">
          {provider} 계정으로 로그인이 완료되었습니다
        </p>
      </div>
      <div className="space-y-4">
        <Button className="w-full" type="button">
          계속하기
        </Button>
      </div>
    </div>
  );
}
