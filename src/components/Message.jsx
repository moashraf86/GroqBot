/* eslint-disable react/prop-types */
export const Message = ({ content, role }) => {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : ""}`}>
      <div
        className={` ${
          role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
        }  py-2 px-3 rounded-lg inline-block text-lg`}
      >
        {content}
      </div>
    </div>
  );
};
