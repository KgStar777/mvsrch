import { ReactNode } from "react";

interface ISubscriptionItemProps {
  className: string;
  rating: number | {
    [key: string]: string;
  };
  objectName: string;
  children: ReactNode;
}

export function SubscriptionItem(props: ISubscriptionItemProps) {
  
  return props?.rating && (
    <span className={props.className}>{props.children}
      {typeof props.rating === "number"
        ? Number(props.rating).toFixed(1)
        : Number(props.rating[props.objectName]).toFixed(1)
      }
    </span>
  )
}