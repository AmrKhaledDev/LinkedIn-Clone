import { VerificationAction } from "@/lib/actions/VerificationAction/VerificationAction";
import VerificationResult from "./_components/VerificationResult";
// ===============================================================================================================
async function Verify({
  searchParams,
}: {
  searchParams: Promise<{ t: string }>;
}) {
  const { t } = await searchParams;
  const result = await VerificationAction(t);
  return (
    <main className="section-space">
      <div className="container-css min-h-screen flex items-center justify-center">
        {result.success ? (
          <VerificationResult typeResult="SUCCESS" message={result.message} />
        ) : (
          <VerificationResult typeResult="FAILED" message={result.message} />
        )}
      </div>
    </main>
  );
}

export default Verify;
