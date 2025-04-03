import type { Route } from "./+types/product-overview-page";

export function loader({ params }: Route.LoaderArgs) {
  return {
    productId: params.productId,
  };
}

export default function ProductOverviewPage({ params: { productId } }: Route.ComponentProps) {
  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold">What is it?</h3>
        <p className="text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Quisquam, quos.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold">How does it work?</h3>
        <p className="text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Quisquam, quos.
        </p>
      </div>
    </div>
  );
}
