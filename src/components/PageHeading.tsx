export default function PageHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-2">
      <h1 className="heading">{title}</h1>
      <p className="text">{description}</p>
    </div>
  );
}
