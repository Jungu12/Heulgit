package morningrolecall.heulgit.image.util;

public class FileUtils {
	private static final String CATEGORY_PREFIX = "/";
	private static final String SEPARATOR = "_";
	private static final String FILE_EXTENSION_SEPARATOR = ".";

	/**
	 *  파일이름 반환
	 * 1. 카테고리, githubId, 파일이름을 받아
	 * 2. 카테고리/github_id_파일이름_시간 순으로 반환
	 * */
	public static String buildFileName(String category, String githubId, String originalFileName) {
		int fileExtensionIndex = originalFileName.lastIndexOf(FILE_EXTENSION_SEPARATOR);
		String fileExtension = originalFileName.substring(fileExtensionIndex);
		String fileName = originalFileName.substring(0, fileExtensionIndex);
		String now = String.valueOf(System.currentTimeMillis());
		return category + CATEGORY_PREFIX + githubId+SEPARATOR+fileName + SEPARATOR + now +SEPARATOR+ fileExtension;

	}
}
