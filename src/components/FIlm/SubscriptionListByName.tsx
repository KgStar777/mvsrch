type SubscriptionDifferentType = string | {
  [key: string]: string;
}

interface ISubscriptionListByNameProps {
  items: Array<SubscriptionDifferentType>;
  objectName: string;
}

export function SubscriptionListByName(props: ISubscriptionListByNameProps) {
  return (
    <>
      <span className="subscriptionText">
        {
          props.items.map((item, idx) => {
          const current = typeof item === "string"
            ? `${item }`
            : `${item[props.objectName] } `;
          return idx !== props.items.length - 1
            ? <span key={idx}>{current}<pre /></span>
            : <span key={idx}>{current}</span>;
          })
        }
      </span> |
    </>
  )
}