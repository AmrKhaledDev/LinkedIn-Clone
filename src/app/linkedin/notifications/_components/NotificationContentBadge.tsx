function NotificationContentBadge({content,label}:{content:string,label:string}) {
  return (
    <p className="mt-2 lg:text-[13px] [word-break:break-word] sm:text-[12px] text-[10px] text-gray-700 bg-gray-50/80 border border-gray-100 py-1 px-4 rounded-2xl w-fit sm:line-clamp-2 line-clamp-2 shadow-sm">
      <span className="font-semibold mr-1">{label}</span>:
      {content}
    </p>
  );
}

export default NotificationContentBadge;
